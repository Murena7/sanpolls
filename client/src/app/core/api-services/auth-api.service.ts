import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/entities/user/user.models';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpService, private authService: AuthService) {}

  login(userData) {
    return this.http
      .skipErrorHandler()
      .post<IBasicResponse>(`${environment.UI_SERVER}/auth/login`, userData)
      .pipe(
        map(data => data.data),
        map((user: User) => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('isAuthorized', '1');
            this.authService.setUser(user);
          }

          return user;
        })
      );
  }
}
