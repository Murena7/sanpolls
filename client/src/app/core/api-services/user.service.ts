import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';
import { IUser } from '@core/entities/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) {}

  getUser(): Observable<IUser> {
    return this.http.get<IBasicResponse>(`${environment.UI_SERVER}/user/me`).pipe(map(data => data.data));
  }

  createNewUser(user): Observable<any> {
    return this.http.post<IBasicResponse>(`${environment.UI_SERVER}/auth/sign-up`, user);
  }
}
