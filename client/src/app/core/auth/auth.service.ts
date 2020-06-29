import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '@core/user/user.models';
import { ILoginResponse } from '@core/auth/auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  JWTHelper = new JwtHelperService();

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(this.decodeUser(JSON.parse(localStorage.getItem('token'))));
    // this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  public setUserFromJWT(token: string) {
    this.currentUserSubject.next(this.decodeUser(token));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private decodeUser(accessToken: string): User {
    try {
      return accessToken ? { ...this.JWTHelper.decodeToken(accessToken), accessToken } : null;
    } catch (e) {
      return null;
    }
  }
}
