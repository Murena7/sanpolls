import { Request } from 'kakapo';
import { environment } from '@environment';
import { MyDatabase, MyOptions, ErrorResponse } from '../core/types';
import { now } from '@core/helpers/moment';
import { UserResponse } from '@core/user/user.types';
import jwt from 'webcrypto-jwt';
import { User } from '@core/user/user.models';

export default class UsersRoutes {
  constructor({ uiRouter }: MyOptions) {
    if (!environment.production) {
      uiRouter.get('/auth/user', (request, db) => this.findOne(request, db));
    }
  }

  findOne(request: Request, db: MyDatabase): UserResponse | ErrorResponse {
    if (!request.headers.Authorization) {
      return new ErrorResponse('Wrong JWT');
    }

    const requestUser: User = jwt.parseJWT(request.headers.Authorization.split(' ')[1]);
    // @ts-ignore
    const user = db.findOne('users', { id: requestUser.id });
    // @ts-ignore
    return user ? { data: user.data } : new ErrorResponse('User not found');
  }
}
