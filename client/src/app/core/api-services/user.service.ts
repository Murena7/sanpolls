import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';
import { IChangePasswordBody, IUpdateProfileBody, IUser } from '@core/entities/user/user.types';
import { AuthService } from '@core/auth/auth.service';
import { ISong } from '@core/entities/song/song.types';
import { IPollTransaction } from '@core/entities/poll-transaction/poll-transaction.types';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService, private authService: AuthService) {}

  getUser(): Observable<IUser> {
    return this.http.get<IBasicResponse>(`${apiUrl}/user/me`).pipe(map((data) => data.data));
  }

  refreshUserData(): Observable<boolean> {
    return this.getUser().pipe(
      map((user) => {
        this.authService.setUser(user);
        return true;
      })
    );
  }

  profileUpdate(body: IUpdateProfileBody): Observable<IUser> {
    return this.http.post<IBasicResponse<IUser>>(`${apiUrl}/user/profile/update`, body).pipe(
      map((data) => data.data),
      map((user) => {
        this.authService.setUser(user);
        return user;
      })
    );
  }

  passwordChange(body: IChangePasswordBody): Observable<IBasicResponse<any>> {
    return this.http.post<IBasicResponse<any>>(`${apiUrl}/user/password/change`, body);
  }

  userSongHistory(): Observable<ISong[]> {
    return this.http.get<IBasicResponse<ISong[]>>(`${apiUrl}/user/song/history`).pipe(map((data) => data.data));
  }

  userPollTransactionHistory(): Observable<IPollTransaction[]> {
    return this.http
      .get<IBasicResponse<IPollTransaction[]>>(`${apiUrl}/user/poll-transaction/history`)
      .pipe(map((data) => data.data));
  }
}
