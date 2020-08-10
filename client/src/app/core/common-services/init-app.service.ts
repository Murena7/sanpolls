import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/api-services/user.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '@core/entities/user/user.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  public initUser(): Promise<any> {
    if (localStorage.getItem('isAuthorized')) {
      return this.userService
        .getUser()
        .pipe(
          tap((user: IUser) => {
            this.authService.setUser(user);
          })
        )
        .toPromise();
    }

    return of().toPromise();
  }
}
