///// ADMIN
import { putUserToAdmin } from '../../endpoints/admin/putUserToAdmin';
import { postAddVoice } from '../../endpoints/admin/postAddVoice';
import { postPollCreate } from '../../endpoints/admin/postPollCreate';
import { getAllUsers } from '../../endpoints/admin/getAllUsers';
import { getAllPolls } from '../../endpoints/admin/getAllPolls';
import { getAllTransactions } from '../../endpoints/admin/getAllTransactions';
import { getStatisticTotal } from '../../endpoints/admin/getStatisticTotal';
import { putSwitchPollEventStatus } from '../../endpoints/admin/putSwitchPollEventStatus';
import { postPollEdit } from '../../endpoints/admin/postPollEdit';

export const adminRoutes = {
  '/admin/user/{userId}/user-to-admin': {
    put: putUserToAdmin,
  },
  '/admin/user/add-voice': {
    post: postAddVoice,
  },
  '/admin/user/all': {
    get: getAllUsers,
  },
  '/admin/poll/create': {
    post: postPollCreate,
  },
  '/admin/poll/{pollId}/edit': {
    post: postPollEdit,
  },
  '/admin/poll/all': {
    get: getAllPolls,
  },
  '/admin/transaction/all': {
    get: getAllTransactions,
  },
  '/admin/statistic/total': {
    get: getStatisticTotal,
  },
  '/admin/poll/{eventId}/switch-status': {
    put: putSwitchPollEventStatus,
  },
};
