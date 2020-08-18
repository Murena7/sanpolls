import { User } from '../../entity';

export const rawSqlGetChildComments = (commentId: string, skip: number, take: number, currentUser: User) => {
  return `SELECT child_comment.id, child_comment."userId", child_comment."commentId",
        child_comment."text", child_comment."createdAt", child_comment."updatedAt",
        json_build_object( 'username', u1."username" ) AS "user",
        ${
          currentUser
            ? `json_strip_nulls(json_build_object( 'id', ld1."id", 'userId', ld1."userId", 'isLike', ld1."isLike" )) AS "selfLike",`
            : ''
        }
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."childCommentLikeDislikeId" = child_comment.id AND like_dislike."isLike" = true) AS "likeCount",
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."childCommentLikeDislikeId" = child_comment.id AND like_dislike."isLike" = false) AS "dislikeCount"
        FROM child_comment
        LEFT JOIN "user" u1 ON child_comment."userId" = u1.id
        ${
          currentUser
            ? `LEFT JOIN "like_dislike" ld1 ON ld1."userId" = '${currentUser.id}' AND child_comment."id" = ld1."parentId"`
            : ''
        }
        WHERE child_comment."commentId" = '${commentId}' ORDER BY child_comment."createdAt" DESC OFFSET ${skip} LIMIT ${take}`;
};
