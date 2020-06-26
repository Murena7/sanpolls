import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPoll } from '@core/polls/polls.types';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpClient) {}

  getPolls(): Observable<IPoll[]> {
    return this.http.get<any>(`${apiUrl}/polls`).pipe(map((data) => data.data));
  }

  getPollById(id): Observable<any> {
    return this.http.get<any>(`${apiUrl}/poll/${id}`).pipe(map((data) => data.data));
  }
}
