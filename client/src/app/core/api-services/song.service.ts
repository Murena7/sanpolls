import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IChildCommentReqLikeBody,
  ICommentReqLikeBody,
  ICreateSong,
  IGetCommentBySongIdParams,
  ISong,
  ISongLikeBody,
} from '../entities/song/song.types';
import { IBasicResponse, ResponseStatusMessage } from '../core.types';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpService } from '../common-services/http.service';
import { toQueryString } from '../helpers/http';
import { IAddCommentReqBody, IComment, IEditCommentReqBody } from '../entities/comment/comment';
import { IChildComment } from '../entities/child-comment/child-comment';

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

  songLike(songId: string, body: ISongLikeBody): Observable<IBasicResponse> {
    return this.http.post<IBasicResponse>(`${apiUrl}/song/${songId}/like`, body);
  }

  commentLike(commentId: string, body: ICommentReqLikeBody): Observable<IBasicResponse<IComment>> {
    return this.http.post<IBasicResponse<IComment>>(`${apiUrl}/song/comments/${commentId}/like`, body);
  }

  childCommentLike(childCommentId: string, body: IChildCommentReqLikeBody): Observable<IBasicResponse> {
    return this.http.post<IBasicResponse>(`${apiUrl}/song/comments/child/${childCommentId}/like`, body);
  }

  getCommentsBySongId(songId: string, queryParams?: IGetCommentBySongIdParams): Observable<IComment[]> {
    return this.http
      .get<IBasicResponse<IComment[]>>(`${apiUrl}/song/${songId}/comments${toQueryString(queryParams)}`)
      .pipe(map((data) => data.data));
  }

  addCommentBySongId(songId: string, body: IAddCommentReqBody): Observable<IComment> {
    return this.http
      .post<IBasicResponse<IComment>>(`${apiUrl}/song/${songId}/comments/add`, body)
      .pipe(map((data) => data.data));
  }

  editCommentByCommentId(commentId: string, body: IEditCommentReqBody): Observable<IComment> {
    return this.http
      .post<IBasicResponse<IComment>>(`${apiUrl}/song/comments/${commentId}/edit`, body)
      .pipe(map((data) => data.data));
  }

  deleteCommentByCommentId(commentId: string): Observable<IBasicResponse> {
    return this.http.delete<IBasicResponse<IComment>>(`${apiUrl}/song/comments/${commentId}/delete`);
  }

  getChildCommentsByCommentId(
    commentId: string,
    disableLoader = false,
    queryParams?: IGetCommentBySongIdParams
  ): Observable<IChildComment[]> {
    if (disableLoader) {
      return this.http
        .disableLoaderInterceptor()
        .get<IBasicResponse<IChildComment[]>>(`${apiUrl}/song/comments/${commentId}/child${toQueryString(queryParams)}`)
        .pipe(map((data) => data.data));
    } else {
      return this.http
        .get<IBasicResponse<IChildComment[]>>(`${apiUrl}/song/comments/${commentId}/child${toQueryString(queryParams)}`)
        .pipe(map((data) => data.data));
    }
  }

  addChildCommentByCommentId(commentId: string, body: IAddCommentReqBody): Observable<IChildComment[]> {
    return this.http
      .post<IBasicResponse<IChildComment[]>>(`${apiUrl}/song/comments/${commentId}/child/add`, body)
      .pipe(map((data) => data.data));
  }

  editChildCommentByChildCommentId(childCommentId: string, body: IEditCommentReqBody): Observable<IComment> {
    return this.http
      .post<IBasicResponse<IComment>>(`${apiUrl}/song/comments/child/${childCommentId}/edit`, body)
      .pipe(map((data) => data.data));
  }

  deleteChildCommentByChildCommentId(childCommentId: string): Observable<IBasicResponse> {
    return this.http.delete<IBasicResponse<IComment>>(`${apiUrl}/song/comments/child/${childCommentId}/delete`);
  }
}
