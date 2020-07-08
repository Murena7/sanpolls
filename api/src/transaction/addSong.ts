import { getManager, Repository } from 'typeorm';
import { IAddSongBody } from '../interfaces/song';
import { User } from '../entity/user';
import { Song } from '../entity/song';
import { PollTransaction } from '../entity/poll-transaction';
import { plainToClass } from 'class-transformer';
import { TransactionSource } from '../interfaces/poll-transaction';
import { PollEvent } from '../entity/poll-event';
import { ResponseStatusMessage } from '../interfaces/response';

export const addSongTransaction = async (body: IAddSongBody, currentUser: User) => {
  return getManager().transaction('READ COMMITTED', async transactionalEntityManager => {
    const songRepository: Repository<Song> = transactionalEntityManager.getRepository(Song);
    const userRepository: Repository<User> = transactionalEntityManager.getRepository(User);
    const eventRepository: Repository<PollEvent> = transactionalEntityManager.getRepository(PollEvent);
    const pollTransactionRepository: Repository<PollTransaction> = transactionalEntityManager.getRepository(
      PollTransaction,
    );

    const user = await userRepository
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: currentUser.id })
      .getOne();

    const event = await eventRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id: body.eventId })
      .getOne();

    if (!user || !event) {
      throw new Error('Wrong User or Event');
    }

    if (user.voiceBalance < body.voiceCount) {
      throw new Error('Low Voice Balance');
    }

    const newSongData = {
      userId: user.id,
      eventId: body.eventId,
      songSinger: body.songSinger,
      songName: body.songName,
      coverSinger: body.coverSinger,
      voiceCount: body.voiceCount,
      additionalTextInfo: body.additionalTextInfo,
      youtubeVideoId: body.youtubeVideoId,
    };

    const newSong = await songRepository
      .create(plainToClass(Song, newSongData, { excludeExtraneousValues: true }))
      .save();

    const newPollTransactionData = {
      userId: user.id,
      eventId: body.eventId,
      songId: newSong.id,
      amount: -body.voiceCount,
      source: TransactionSource.AddSong,
    };

    const newPollTransaction = await pollTransactionRepository
      .create(plainToClass(PollTransaction, newPollTransactionData, { excludeExtraneousValues: true }))
      .save();

    user.voiceBalance = user.voiceBalance - body.voiceCount;

    const newUser = await transactionalEntityManager.save(user);

    return ResponseStatusMessage.Success;
  });
};
