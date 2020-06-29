import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/user/user.models';
import { HttpService } from '@core/common-services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpService, private authService: AuthService) {}

  login(userData) {
    return this.http.post<any>(`${environment.UI_SERVER}/auth/login`, userData).pipe(
      map((user: User) => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', user.accessToken);
          this.authService.setUser(user);
        }

        return user;
      })
    );
  }
}
