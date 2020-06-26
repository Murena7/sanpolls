import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@environment';
import { User } from '@core/user/user.models';
import { ILoginResponse } from '@core/auth/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  JWTHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      this.decodeUser(JSON.parse(localStorage.getItem('currentUser')))
    );
    // this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userData) {
    return this.http.post<any>(`${environment.UI_SERVER}/auth/login`, userData).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(this.decodeUser(user));
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private decodeUser(userResponse: ILoginResponse): User {
    return userResponse
      ? { ...this.JWTHelper.decodeToken(userResponse.accessToken), accessToken: userResponse.accessToken }
      : null;
  }
}
