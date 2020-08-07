import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { plainToClass } from 'class-transformer';
import { User } from '../entity/user';
import { IAddSongBody, ISongLikeBody } from '../interfaces/song';
import { addSongTransaction } from '../transaction/addSong';
import { likeSongTransaction } from '../transaction/likeSong';
import { LikeDislike } from '../entity';
import { ParentType } from '../interfaces/like-dislike';

@Service()
export default class SongService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;
  likeDislikeRepository: Repository<LikeDislike>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
    this.likeDislikeRepository = getRepository(LikeDislike);
  }

  public async songLike(songId: string, body: ISongLikeBody, currentUser: User): Promise<IBasicResponse> {
    try {
      const transactionStatus = await likeSongTransaction(songId, body, currentUser);

      return { status: transactionStatus };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addSong(body: IAddSongBody, currentUser: User): Promise<IBasicResponse> {
    try {
      // User pre check
      if (currentUser.voiceBalance < 1 || currentUser.voiceBalance < body.voiceCount) {
        throw new Error('Low Voice Balance');
      }

      const transactionStatus = await addSongTransaction(body, currentUser);

      return { status: transactionStatus };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async songById(id: string, currentUser: User): Promise<IBasicResponse> {
    try {
      const result = await this.songRepository
        .createQueryBuilder('song')
        .leftJoin('song.user', 'user')
        .addSelect('user.username')
        .loadRelationCountAndMap('song.likeCount', 'song.like')
        .loadRelationCountAndMap('song.dislikeCount', 'song.dislike')
        .whereInIds(id)
        .getOne();

      if (!result) {
        throw new Error('Song not found');
      }

      let selfLike;
      if (currentUser) {
        selfLike = await this.likeDislikeRepository.findOne({
          select: ['id', 'userId', 'isLike'],
          where: { userId: currentUser.id, parentId: id, parentType: ParentType.Song },
        });
      }

      const position = await this.songRepository.query(
        `SELECT position FROM (SELECT *, row_number() over( order by "voiceCount" DESC ) as position FROM song WHERE "eventId" = '${result.eventId}' ) song WHERE "id" = '${result.id}';`,
      );

      return { data: { ...result, ratingPosition: +position[0].position, selfLike } };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
