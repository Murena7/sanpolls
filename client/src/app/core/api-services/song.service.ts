import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateSong, IGetCommentBySongIdParams, ISong, ISongLikeBody } from '../entities/song/song.types';
import { IBasicResponse, ResponseStatusMessage } from '../core.types';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpService } from '../common-services/http.service';
import { toQueryString } from '../helpers/http';
import { IAddEditCommentBody, IComment } from '../entities/comment/comment';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpService) {}

  getSongById(id): Observable<ISong> {
    return this.http.get<IBasicResponse>(`${apiUrl}/song/${id}`).pipe(map((data) => data.data));
  }

  createSong(song: ICreateSong): Observable<ISong> {
    return this.http.post<IBasicResponse<ISong>>(`${apiUrl}/song/add`, song).pipe(map((data) => data.data));
  }

  songLike(songId: string, body: ISongLikeBody): Observable<ISong> {
    return this.http.post<IBasicResponse<ISong>>(`${apiUrl}/song/${songId}/like`, body).pipe(map((data) => data.data));
  }

  getCommentsBySongId(songId: string, queryParams?: IGetCommentBySongIdParams): Observable<IComment[]> {
    return this.http
      .get<IBasicResponse<IComment[]>>(`${apiUrl}/song/${songId}/comments${toQueryString(queryParams)}`)
      .pipe(map((data) => data.data));
  }

  addCommentBySongId(songId: string, body: IAddEditCommentBody): Observable<IComment> {
    return this.http
      .post<IBasicResponse<IComment>>(`${apiUrl}/song/${songId}/comments/add`, body)
      .pipe(map((data) => data.data));
  }

  editCommentByCommentId(songId: string, commentId: string, body: IAddEditCommentBody): Observable<IComment> {
    return this.http
      .post<IBasicResponse<IComment>>(`${apiUrl}/song/${songId}/comments/${commentId}/edit`, body)
      .pipe(map((data) => data.data));
  }

  deleteCommentByCommentId(songId: string, commentId: string): Observable<IBasicResponse> {
    return this.http.delete<IBasicResponse<IComment>>(`${apiUrl}/song/${songId}/comments/${commentId}/delete`);
  }
}
