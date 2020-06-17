import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/services/user.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@core/user/user.models';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {
  constructor(private authService: AuthService, private userService: UserService) {}

  public initUser(): Promise<any> {
    if (localStorage.getItem('currentUser')) {
      return this.userService
        .getUser()
        .pipe(
          tap((user: User) => {
            this.authService.currentUserSubject.next(user);
          })
        )
        .toPromise();
    }

    return of().toPromise();
  }
}
