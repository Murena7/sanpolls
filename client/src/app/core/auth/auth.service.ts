import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@core/user/user.models';
import { removeAllCookies } from '../../../mock/core/cookie.helper';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    // this.currentUserSubject = new BehaviorSubject<User>(this.decodeUser(localStorage.getItem('token')));
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('isAuthorized');
    removeAllCookies();
    this.currentUserSubject.next(null);
  }
}
