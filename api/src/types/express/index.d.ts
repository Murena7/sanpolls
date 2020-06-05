import { User } from '../../entity/user';

declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
    }
  }

  namespace Models {
    export type UserModel = User;
  }
}
