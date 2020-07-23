import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';
import { Song } from '../entity/song';
import { PollTransaction } from '../entity/poll-transaction';
import { plainToClass } from 'class-transformer';
import { TransactionSource } from '../interfaces/poll-transaction';
import { ResponseStatusMessage } from '../interfaces/response';
import { IGiveVoteBody } from '../interfaces/vote';

export const giveVoteTransaction = async (body: IGiveVoteBody, currentUser: User) => {
  return getManager().transaction('READ COMMITTED', async transactionalEntityManager => {
    const songRepository: Repository<Song> = transactionalEntityManager.getRepository(Song);
    const userRepository: Repository<User> = transactionalEntityManager.getRepository(User);
    const pollTransactionRepository: Repository<PollTransaction> = transactionalEntityManager.getRepository(
      PollTransaction,
    );

    const user = await userRepository
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: currentUser.id })
      .getOne();

    const song = await songRepository
      .createQueryBuilder('song')
      .setLock('pessimistic_write')
      .where('song.id = :id', { id: body.songId })
      .getOne();

    if (!user || !song) {
      throw new Error('Wrong User or Song');
    }

    if (user.voiceBalance < body.voiceCount) {
      throw new Error('Low Voice Balance');
    }

    const newPollTransactionData = {
      userId: user.id,
      eventId: song.eventId,
      songId: song.id,
      amount: -body.voiceCount,
      source: TransactionSource.GiveVote,
    };

    await transactionalEntityManager.save(
      pollTransactionRepository.create(
        plainToClass(PollTransaction, newPollTransactionData, { excludeExtraneousValues: true }),
      ),
    );

    // Decrease balance
    user.voiceBalance = user.voiceBalance - body.voiceCount;
    // Increase voice count
    song.voiceCount = song.voiceCount + body.voiceCount;

    await transactionalEntityManager.save(user);
    await transactionalEntityManager.save(song);

    return ResponseStatusMessage.Success;
  });
};
