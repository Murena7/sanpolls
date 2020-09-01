export const rawSqlSongById = (id: string) => {
  return `SELECT song.id, song."userId", song."eventId",
        song."songSinger", song."songName", song."coverSinger",
        song."voiceCount", song."additionalTextInfo", song."youtubeVideoId", song."createdAt", song."updatedAt",
        json_build_object( 'username', u1."username" ) AS "user", song."ratingPosition",
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."songLikeDislikeId" = song.id AND like_dislike."isLike" = true) AS "likeCount",
        (SELECT CAST(COUNT(*) AS INTEGER) FROM like_dislike WHERE like_dislike."songLikeDislikeId" = song.id AND like_dislike."isLike" = false) AS "dislikeCount"
        FROM (SELECT *, CAST(row_number() over( order by "voiceCount" DESC) AS INTEGER) "ratingPosition" FROM song) song
        LEFT JOIN "user" u1 ON song."userId" = u1.id
        WHERE song."id" = '${id}'`;
};
