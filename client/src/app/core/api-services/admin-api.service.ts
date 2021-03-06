import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse, ResponseStatusMessage } from '@core/core.types';
import { IAddVoiceBody, ICreatePollBody, IPaginationQueryParams } from '@core/interfaces/admin/admin.types';
import { toQueryString } from '@core/helpers/http';
import { IPollEvent } from '@core/interfaces/poll-event/poll-event.types';
import { IPollTransaction } from '@core/interfaces/poll-transaction/poll-transaction.types';
import { IStatisticTotal } from '@core/interfaces/statistic/statistic.types';
import { IUser } from '@core/interfaces/user/user.types';

@Injectable()
export class AdminApiService {
  constructor(private http: HttpService) {}

  setUserToAdmin(userId: number): Observable<ResponseStatusMessage> {
    return this.http
      .put<IBasicResponse>(`${environment.UI_SERVER}/admin/user/${userId}/user-to-admin`, {})
      .pipe(map((data) => data.status));
  }

  addVoice(body: IAddVoiceBody): Observable<ResponseStatusMessage> {
    return this.http
      .post<IBasicResponse>(`${environment.UI_SERVER}/admin/user/add-voice`, body)
      .pipe(map((data) => data.status));
  }

  getAllUsers(queryParams?: IPaginationQueryParams, disableLoader = false): Observable<IBasicResponse<IUser[]>> {
    if (disableLoader) {
      return this.http
        .disableLoaderInterceptor()
        .get<IBasicResponse<IUser[]>>(`${environment.UI_SERVER}/admin/user/all${toQueryString(queryParams)}`);
    } else {
      return this.http.get<IBasicResponse<IUser[]>>(
        `${environment.UI_SERVER}/admin/user/all${toQueryString(queryParams)}`
      );
    }
  }

  createNewPoll(body: ICreatePollBody): Observable<IPollEvent> {
    return this.http
      .post<IBasicResponse<IPollEvent>>(`${environment.UI_SERVER}/admin/poll/create`, body)
      .pipe(map((data) => data.data));
  }

  editPoll(body: ICreatePollBody, pollId): Observable<IPollEvent> {
    return this.http
      .post<IBasicResponse<IPollEvent>>(`${environment.UI_SERVER}/admin/poll/${pollId}/edit`, body)
      .pipe(map((data) => data.data));
  }

  getAllPolls(queryParams?: IPaginationQueryParams, disableLoader = false): Observable<IBasicResponse<IPollEvent[]>> {
    if (disableLoader) {
      return this.http
        .disableLoaderInterceptor()
        .get<IBasicResponse<IPollEvent[]>>(`${environment.UI_SERVER}/admin/poll/all${toQueryString(queryParams)}`);
    } else {
      return this.http.get<IBasicResponse<IPollEvent[]>>(
        `${environment.UI_SERVER}/admin/poll/all${toQueryString(queryParams)}`
      );
    }
  }

  getAllTransactions(
    queryParams?: IPaginationQueryParams,
    disableLoader = false
  ): Observable<IBasicResponse<IPollTransaction[]>> {
    if (disableLoader) {
      return this.http
        .disableLoaderInterceptor()
        .get<IBasicResponse<IPollTransaction[]>>(
          `${environment.UI_SERVER}/admin/transaction/all${toQueryString(queryParams)}`
        );
    } else {
      return this.http.get<IBasicResponse<IPollTransaction[]>>(
        `${environment.UI_SERVER}/admin/transaction/all${toQueryString(queryParams)}`
      );
    }
  }

  getStatisticTotal(): Observable<IStatisticTotal> {
    return this.http
      .get<IBasicResponse<IStatisticTotal>>(`${environment.UI_SERVER}/admin/statistic/total`)
      .pipe(map((data) => data.data));
  }

  switchPollStatus(pollId: string): Observable<IBasicResponse<IPollEvent>> {
    return this.http.put<IBasicResponse<IPollEvent>>(`${environment.UI_SERVER}/admin/poll/${pollId}/switch-status`, {});
  }
}
