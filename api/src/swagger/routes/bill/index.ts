///// Bill
import { postBillCreate } from '../../endpoints/bill/postBillCreate';
import { getStatusObmenka } from '../../endpoints/bill/getStatusObmenka';
import { getBillHistoryByUser } from '../../endpoints/bill/getBillHistory';
import { deleteBillById } from '../../endpoints/bill/deleteBillById';

export const billRoutes = {
  '/bill/create': {
    post: postBillCreate,
  },
  '/bill/status/obmenka': {
    get: getStatusObmenka,
  },
  '/bill/history': {
    get: getBillHistoryByUser,
  },
  '/bill/remove/{billId}': {
    delete: deleteBillById,
  },
};
