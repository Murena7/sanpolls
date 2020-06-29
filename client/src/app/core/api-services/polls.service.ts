import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPoll } from '@core/polls/polls.types';
import { HttpService } from '@core/common-services/http.service';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpService) {}

  getPolls(): Observable<IPoll[]> {
    return this.http.get<any>(`${apiUrl}/polls`).pipe(map((data) => data.data));
  }

  getPollById(id): Observable<any> {
    return this.http.get<any>(`${apiUrl}/poll/${id}`).pipe(map((data) => data.data));
  }
}
