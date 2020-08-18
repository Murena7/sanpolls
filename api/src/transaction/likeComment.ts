import { getManager, Repository } from 'typeorm';
import { ICommentLikeBody } from '../interfaces/song';
import { User } from '../entity/user';
import { ResponseStatusMessage } from '../interfaces/response';
import { LikeStatus, ParentType } from '../interfaces/like-dislike';
import { Comment, LikeDislike } from '../entity';

export const likeCommentTransaction = async (commentId: string, body: ICommentLikeBody, currentUser: User) => {
  return getManager().transaction('READ COMMITTED', async transactionalEntityManager => {
    const commentRepository: Repository<Comment> = transactionalEntityManager.getRepository(Comment);
    const likeDislikeRepository: Repository<LikeDislike> = transactionalEntityManager.getRepository(LikeDislike);

    const setLike = (likeStatus: LikeStatus) => {
      switch (likeStatus) {
        case LikeStatus.unset:
          return null;
        case LikeStatus.dislike:
          return false;
        case LikeStatus.like:
          return true;
        default:
          throw new Error('Wrong setLikeStatus');
      }
    };

    const createLikeDislikeEntity = (likeStatus: LikeStatus) => {
      return transactionalEntityManager.save(
        likeDislikeRepository.create({
          userId: currentUser.id,
          parentId: commentId,
          parentType: ParentType.Comment,
          isLike: setLike(likeStatus),
        }),
      );
    };

    const comment = await commentRepository
      .createQueryBuilder('comment')
      .setLock('pessimistic_write')
      .where('comment.id = :id', { id: commentId })
      .getOne();

    if (!comment) {
      throw new Error('Wrong Song');
    }

    if (body.likeId) {
      const likeDislike = await likeDislikeRepository
        .createQueryBuilder('like_dislike')
        .setLock('pessimistic_write')
        .where('like_dislike.id = :id', { id: body.likeId })
        .getOne();

      if (!likeDislike) {
        throw new Error('Wrong LikeDislikeId');
      }

      switch (body.likeStatus) {
        case LikeStatus.unset:
          await transactionalEntityManager.remove(likeDislike);
          break;
        case LikeStatus.dislike:
        case LikeStatus.like:
          await transactionalEntityManager.remove(likeDislike);
          await transactionalEntityManager
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .relation(Comment, 'likeDislike')
            .of(comment)
            .add(await createLikeDislikeEntity(body.likeStatus));
          break;
        default:
          throw new Error('Wrong default likeStatus');
          break;
      }
    } else {
      const existLike = await likeDislikeRepository
        .createQueryBuilder('like_dislike')
        .where({
          userId: currentUser.id,
          parentId: commentId,
        })
        .getOne();

      if (existLike) {
        throw new Error('No More then 1 like/dislike');
      }

      switch (body.likeStatus) {
        case LikeStatus.unset:
          throw new Error('Wrong like status no id');
          break;
        case LikeStatus.dislike:
        case LikeStatus.like:
          await transactionalEntityManager
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .relation(Comment, 'likeDislike')
            .of(comment)
            .add(await createLikeDislikeEntity(body.likeStatus));
          break;
        default:
          throw new Error('Wrong default likeStatus');
          break;
      }
    }

    return ResponseStatusMessage.Success;
  });
};
