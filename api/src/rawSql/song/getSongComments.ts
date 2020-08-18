import { User } from '../../entity';

export const rawSqlGetSongComments = (songId: string, skip: number, take: number, currentUser: User) => {
  return `SELECT comment.id, comment."userId", comment."eventId", comment."songId",
        comment."text", comment."createdAt", comment."updatedAt",
        json_build_object( 'username', u1."username" ) AS "user",
        ${
          currentUser
            ? `json_strip_nulls(json_build_object( 'id', ld1."id", 'userId', ld1."userId", 'isLike', ld1."isLike" )) AS "selfLike",`
            : ''
        }
        (SELECT CAST(COUNT(*) AS INTEGER) FROM child_comment WHERE child_comment."commentId" = comment.id) AS "childCommentsCount",
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."commentLikeDislikeId" = comment.id AND like_dislike."isLike" = true) AS "likeCount",
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."commentLikeDislikeId" = comment.id AND like_dislike."isLike" = false) AS "dislikeCount"
        FROM comment
        LEFT JOIN "user" u1 ON comment."userId" = u1.id
        ${
          currentUser
            ? `LEFT JOIN "like_dislike" ld1 ON ld1."userId" = '${currentUser.id}' AND comment."id" = ld1."parentId"`
            : ''
        }
        WHERE comment."songId" = '${songId}' ORDER BY comment."createdAt" DESC OFFSET ${skip} LIMIT ${take}`;
};
