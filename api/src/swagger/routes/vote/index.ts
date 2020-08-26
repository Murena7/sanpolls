///// VOTE
import { postGiveVote } from '../../endpoints/vote/postGiveVote';

export const voteRoutes = {
  '/vote/give': {
    post: postGiveVote,
  },
};
