import { User as CurrentUser } from '../../entity/user';

declare global {
  namespace Express {
    export interface Request {
      // @ts-ignore
      user: CurrentUser;
    }
  }

  namespace Models {
    export type UserModel = CurrentUser;
  }
}
