import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { plainToClass } from 'class-transformer';
import { User } from '../entity/user';
import { IAddEditCommentBody, IAddSongBody, IGetComments, ISongLikeBody } from '../interfaces/song';
import { addSongTransaction } from '../transaction/addSong';
import { likeSongTransaction } from '../transaction/likeSong';
import { Comment, LikeDislike } from '../entity';
import { ParentType } from '../interfaces/like-dislike';
import { EventStatus, IGetPollListBody } from '../interfaces/poll-event';
import { ResponseStatusMessage } from '../interfaces/response';

@Service()
export default class SongService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;
  likeDislikeRepository: Repository<LikeDislike>;
  commentRepository: Repository<Comment>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
    this.likeDislikeRepository = getRepository(LikeDislike);
    this.commentRepository = getRepository(Comment);
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

  public async getSongComments(body: IGetComments): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 20;
      const skip: number = +body.skip || 0;
      let id: string = body.id;

      if (!id) {
        throw new Error('No song id');
      }

      const [result, total] = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoin('comment.user', 'user')
        .addSelect('user.username')
        .where('comment.songId = :songId', { songId: id })
        .orderBy('comment.createdAt', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { data: result, count: total };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addSongComment(currentUser: User, songId: string, body: IAddEditCommentBody): Promise<IBasicResponse> {
    try {
      if (!songId && !currentUser) {
        throw new Error('No song id or wrong User');
      }

      const song = await this.songRepository.findOneOrFail({ id: songId });

      const newComment = await this.commentRepository
        .create({
          userId: currentUser.id,
          eventId: song.eventId,
          songId: song.id,
          text: body.commentText,
        })
        .save();

      const result = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoin('comment.user', 'user')
        .addSelect('user.username')
        .where('comment.id = :id', { id: newComment.id })
        .getOne();

      return { data: result };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async editSongComment(
    currentUser: User,
    commentId: string,
    body: IAddEditCommentBody,
  ): Promise<IBasicResponse> {
    try {
      if (!commentId) {
        throw new Error('No commentId');
      }

      const comment = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoin('comment.user', 'user')
        .addSelect('user.username')
        .where('comment.id = :id', { id: commentId })
        .getOne();

      if (!comment) {
        throw new Error('Wrong commentId');
      }

      if (comment.userId !== currentUser.id) {
        throw new Error('You can not edit this comment');
      }

      comment.text = body.commentText;

      await comment.save();

      return { data: comment };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteSongComment(currentUser: User, commentId: string): Promise<IBasicResponse> {
    try {
      if (!commentId) {
        throw new Error('No commentId');
      }

      const comment = await this.commentRepository.findOneOrFail({ id: commentId });

      if (comment.userId !== currentUser.id) {
        throw new Error('You can not delete this comment');
      }

      await comment.remove();

      return { status: ResponseStatusMessage.Success };
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
