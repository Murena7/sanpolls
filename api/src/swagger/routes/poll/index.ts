//// POLL Routes
import {getActivePoll} from '../../endpoints/poll/getActivePoll';
import {getRatingList} from '../../endpoints/poll/getRatingList';
import {getAllPollsArchived} from '../../endpoints/poll/getAllPollsArchived';

export const pollRoutes = {
  '/poll/active': {
    get: getActivePoll,
  },
  '/poll/rating-list': {
    get: getRatingList,
  },
  '/poll/all-archived': {
    get: getAllPollsArchived,
  },
};
