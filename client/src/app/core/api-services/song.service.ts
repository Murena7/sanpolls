import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateSong, ISong, ISongLikeBody } from '../entities/song/song.types';
import { IBasicResponse } from '../core.types';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpService } from '../common-services/http.service';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpService) {}

  getSongById(id): Observable<ISong> {
    return this.http.get<IBasicResponse>(`${apiUrl}/song/by-id/${id}`).pipe(map((data) => data.data));
  }

  createSong(song: ICreateSong): Observable<ISong> {
    return this.http.post<IBasicResponse<ISong>>(`${apiUrl}/song/add`, song).pipe(map((data) => data.data));
  }

  songLike(songId: string, body: ISongLikeBody): Observable<ISong> {
    return this.http.post<IBasicResponse<ISong>>(`${apiUrl}/song/like/${songId}`, body).pipe(map((data) => data.data));
  }
}
