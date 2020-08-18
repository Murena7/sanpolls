import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { plainToClass } from 'class-transformer';
import { User } from '../entity/user';
import {
  IAddEditCommentBody,
  IAddSongBody,
  ICommentLikeBody,
  IGetChildComments,
  IGetComments,
  ISongLikeBody,
} from '../interfaces/song';
import { addSongTransaction } from '../transaction/addSong';
import { likeSongTransaction } from '../transaction/likeSong';
import { ChildComment, Comment, LikeDislike } from '../entity';
import { ParentType } from '../interfaces/like-dislike';
import { ResponseStatusMessage } from '../interfaces/response';
import { rawSqlSongById } from '../rawSql/song/songById';
import { likeCommentTransaction } from '../transaction/likeComment';
import { likeChildCommentTransaction } from '../transaction/likeChildComment';
import { rawSqlGetSongComments } from '../rawSql/song/getSongComments';
import { rawSqlGetCommentById } from '../rawSql/song/getCommentById';
import { rawSqlGetChildCommentById } from '../rawSql/song/getChildCommentById';
import { rawSqlGetChildComments } from '../rawSql/song/getChildComments';

@Service()
export default class SongService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;
  likeDislikeRepository: Repository<LikeDislike>;
  commentRepository: Repository<Comment>;
  childCommentRepository: Repository<ChildComment>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
    this.likeDislikeRepository = getRepository(LikeDislike);
    this.commentRepository = getRepository(Comment);
    this.childCommentRepository = getRepository(ChildComment);
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

  public async commentLike(commentId: string, body: ICommentLikeBody, currentUser: User): Promise<IBasicResponse> {
    try {
      const transactionStatus = await likeCommentTransaction(commentId, body, currentUser);

      const data = (await this.commentRepository.query(rawSqlGetCommentById(commentId, currentUser)))[0];

      return { data: data };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async childCommentLike(
    childCommentId: string,
    body: ICommentLikeBody,
    currentUser: User,
  ): Promise<IBasicResponse> {
    try {
      const transactionStatus = await likeChildCommentTransaction(childCommentId, body, currentUser);

      const data = (await this.childCommentRepository.query(rawSqlGetChildCommentById(childCommentId, currentUser)))[0];

      return { data: data };
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

  public async getSongChildComments(body: IGetChildComments, currentUser: User): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 1000;
      const skip: number = +body.skip || 0;
      let id: string = body.commentId;

      if (!id) {
        throw new Error('No CommentId id');
      }

      const total = await this.childCommentRepository
        .createQueryBuilder('child_comment')
        .where('child_comment.commentId = :commentId', { commentId: id })
        .getCount();

      const result = await this.childCommentRepository.query(rawSqlGetChildComments(id, skip, take, currentUser));

      return { data: result, count: total };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getSongComments(body: IGetComments, currentUser: User): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 1000;
      const skip: number = +body.skip || 0;
      let id: string = body.id;

      if (!id) {
        throw new Error('No song id');
      }

      const total = await this.commentRepository
        .createQueryBuilder('comment')
        .where('comment.songId = :songId', { songId: id })
        .getCount();

      const result = await this.commentRepository.query(rawSqlGetSongComments(id, skip, take, currentUser));

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

      const result = (await this.commentRepository.query(rawSqlGetCommentById(newComment.id, currentUser)))[0];

      return { data: result };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addSongChildComment(
    currentUser: User,
    commentId: string,
    body: IAddEditCommentBody,
  ): Promise<IBasicResponse> {
    try {
      if (!commentId && !currentUser) {
        throw new Error('No comment id or wrong User');
      }

      const comment = await this.commentRepository.findOneOrFail({ id: commentId });

      await this.childCommentRepository
        .create({
          userId: currentUser.id,
          commentId: comment.id,
          text: body.commentText,
        })
        .save();

      const total = await this.childCommentRepository
        .createQueryBuilder('child_comment')
        .where('child_comment.commentId = :commentId', { commentId: comment.id })
        .getCount();

      const result = await this.childCommentRepository.query(rawSqlGetChildComments(comment.id, 0, 5000, currentUser));

      return { data: result, count: total };
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

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async editSongChildComment(
    currentUser: User,
    childCommentId: string,
    body: IAddEditCommentBody,
  ): Promise<IBasicResponse> {
    try {
      if (!childCommentId) {
        throw new Error('No childCommentId');
      }

      const childComment = await this.childCommentRepository
        .createQueryBuilder('child_comment')
        .leftJoin('child_comment.user', 'user')
        .addSelect('user.username')
        .where('child_comment.id = :id', { id: childCommentId })
        .getOne();

      if (!childComment) {
        throw new Error('Wrong childCommentId');
      }

      if (childComment.userId !== currentUser.id) {
        throw new Error('You can not edit this comment');
      }

      childComment.text = body.commentText;

      await childComment.save();

      return { status: ResponseStatusMessage.Success };
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

  public async deleteSongChildComment(currentUser: User, childCommentId: string): Promise<IBasicResponse> {
    try {
      if (!childCommentId) {
        throw new Error('No childCommentId');
      }

      const childComment = await this.childCommentRepository.findOneOrFail({ id: childCommentId });

      if (childComment.userId !== currentUser.id) {
        throw new Error('You can not delete this comment');
      }

      await childComment.remove();

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async songById(id: string, currentUser: User): Promise<IBasicResponse> {
    try {
      const result = (await this.songRepository.query(rawSqlSongById(id)))[0];

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

      return { data: { ...result, selfLike } };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
