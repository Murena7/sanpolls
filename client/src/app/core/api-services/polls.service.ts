import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';
import { ICreateSong, ISong } from '@core/interfaces/song/song.types';
import { IGetPollsQueryParams, IPollEvent } from '@core/interfaces/poll-event/poll-event.types';
import { toQueryString } from '@core/helpers/http';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpService) {}

  getPolls(queryParams: IGetPollsQueryParams, disableLoader = false): Observable<IBasicResponse<ISong[]>> {
    if (disableLoader) {
      return this.http
        .disableLoaderInterceptor()
        .get<IBasicResponse>(`${apiUrl}/poll/rating-list${toQueryString(queryParams)}`);
    } else {
      return this.http.get<IBasicResponse>(`${apiUrl}/poll/rating-list${toQueryString(queryParams)}`);
    }
  }

  getAllArchivedPoll(): Observable<IBasicResponse<IPollEvent[]>> {
    return this.http.get<IBasicResponse<IPollEvent[]>>(`${apiUrl}/poll/all-archived`);
  }

  getLastArchivedPoll(): Observable<IBasicResponse<IPollEvent>> {
    return this.http.get<IBasicResponse<IPollEvent>>(`${apiUrl}/poll/last-archived`);
  }

  getActivePoll(): Observable<IPollEvent> {
    return this.http.get<IBasicResponse<IPollEvent>>(`${apiUrl}/poll/active`).pipe(map((data) => data.data));
  }
}
