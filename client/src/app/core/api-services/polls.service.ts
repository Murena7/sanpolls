import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';
import { ICreateSong, ISong } from '@core/entities/song/song.types';
import { IGetPollsQueryParams, IPollEvent } from '@core/entities/poll-event/poll-event.types';
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

  getSongById(id): Observable<ISong> {
    return this.http.get<IBasicResponse>(`${apiUrl}/song/by-id/${id}`).pipe(map((data) => data.data));
  }

  createSong(song: ICreateSong): Observable<ISong> {
    return this.http.post<IBasicResponse<ISong>>(`${apiUrl}/song/add`, song).pipe(map((data) => data.data));
  }

  getActivePoll(): Observable<IPollEvent> {
    return this.http.get<IBasicResponse<IPollEvent>>(`${apiUrl}/poll/active`).pipe(map((data) => data.data));
  }

  getAllArchivedPoll(): Observable<IBasicResponse<IPollEvent[]>> {
    return this.http.get<IBasicResponse<IPollEvent[]>>(`${apiUrl}/poll/all-archived`);
  }

  giveVote(body): Observable<any> {
    return this.http.post<IBasicResponse<any>>(`${apiUrl}/vote/give`, body).pipe(map((data) => data.data));
  }
}
