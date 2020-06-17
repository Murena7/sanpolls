import { Request } from 'kakapo';
import { MyDatabase, MyOptions, ErrorResponse } from '../core/types';
import { environment } from '@environment';
import { ILoginResponse } from '@core/auth/auth.types';
import { signJWT as JWTSign } from 'webcrypto-jwt';

export default class AuthRoutes {
  constructor({ uiRouter }: MyOptions) {
    if (!environment.production) {
      uiRouter.post('/auth/login', (request, db) => this.login(request, db));
      uiRouter.post('/auth/logout', () => this.logout());
      uiRouter.post('/auth/sign-up', () => this.signUp());
      uiRouter.post('/auth/reconfirm-email', () => this.reconfirmEmail());
      uiRouter.post('/auth/password-reset', (request, db) => this.passwordReset(request, db));
    }
  }

  async login(request: Request, db: MyDatabase): Promise<ILoginResponse | ErrorResponse> {
    const body = JSON.parse(request.body);
    const user = db.findOne('users', {
      email: body.email,
      password: body.password,
    });

    return user
      ? {
          accessToken: await this.generateToken(user),
        }
      : new ErrorResponse('Credentials are invalid');
  }

  logout(): {} {
    return {};
  }

  signUp(): {} {
    return {
      success: 'OK',
    };
  }

  reconfirmEmail(): {} {
    return {
      success: 'OK',
    };
  }

  passwordReset(request: Request, db: MyDatabase): {} | ErrorResponse {
    const body = JSON.parse(request.body);

    const user = db.findOne('users', {
      email: body.email,
    });

    return user
      ? {}
      : new ErrorResponse(
          'This email address is not associated with an account. Please try again with a different email.'
        );
  }

  private generateToken(user): Promise<string> {
    return new Promise((resolve, reject) => {
      JWTSign({ foo: 'bar' }, 'secret', 'HS256', (err, token) => {
        resolve(token);
      });
    });
  }
}
