import { getManager, Repository } from 'typeorm';
import { IChildCommentLikeBody, ICommentLikeBody } from '../interfaces/song';
import { User } from '../entity/user';
import { ResponseStatusMessage } from '../interfaces/response';
import { LikeStatus, ParentType } from '../interfaces/like-dislike';
import { ChildComment, Comment, LikeDislike } from '../entity';

export const likeChildCommentTransaction = async (
  childCommentId: string,
  body: IChildCommentLikeBody,
  currentUser: User,
) => {
  return getManager().transaction('READ COMMITTED', async transactionalEntityManager => {
    const childCommentRepository: Repository<ChildComment> = transactionalEntityManager.getRepository(ChildComment);
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
          parentId: childCommentId,
          parentType: ParentType.ChildComment,
          isLike: setLike(likeStatus),
        }),
      );
    };

    const childComment = await childCommentRepository
      .createQueryBuilder('child_comment')
      .setLock('pessimistic_write')
      .where('child_comment.id = :id', { id: childCommentId })
      .getOne();

    if (!childComment) {
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
            .getRepository(ChildComment)
            .createQueryBuilder('child_comment')
            .relation(ChildComment, 'likeDislike')
            .of(childComment)
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
          parentId: childCommentId,
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
            .getRepository(ChildComment)
            .createQueryBuilder('child_comment')
            .relation(ChildComment, 'likeDislike')
            .of(childComment)
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
