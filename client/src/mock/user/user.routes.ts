import { Request } from 'kakapo';
import { environment } from '@environment';
import { MyDatabase, MyOptions, ErrorResponse } from '../core/types';
import { now } from '@core/helpers/moment';
import { UserResponse } from '@core/user/user.types';
import { User } from '@core/user/user.models';
import { getCookie } from '../core/cookie.helper';

export default class UsersRoutes {
  constructor({ uiRouter }: MyOptions) {
    if (!environment.production) {
      uiRouter.get('/auth/user', (request, db) => this.findOne(request, db));
    }
  }

  findOne(request: Request, db: MyDatabase): UserResponse | ErrorResponse {
    const sessionCookie = getCookie('connect.sid');
    const userIdCookie = getCookie('user.id');

    if (!sessionCookie || !userIdCookie) {
      return new ErrorResponse('Credentials are invalid');
    }

    // @ts-ignore
    const user = db.findOne('users', { id: +userIdCookie });
    // @ts-ignore
    return user ? { data: user.data } : new ErrorResponse('User not found');
  }
}
