import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { User } from '../user/user.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<any>(`${environment.UI_SERVER}/auth/user`).pipe(map((data) => data.data));
  }

  createNewUser(user): Observable<any> {
    return this.http.post(`${environment.UI_SERVER}/auth/sign-up`, user);
  }
}
