import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPoll } from '@core/entities/polls/polls.types';
import { HttpService } from '@core/common-services/http.service';
import { IBasicResponse } from '@core/core.types';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(private http: HttpService) {}

  getPolls(): Observable<IPoll[]> {
    return this.http.get<IBasicResponse>(`${apiUrl}/polls`).pipe(map(data => data.data));
  }

  getPollById(id): Observable<any> {
    return this.http.get<IBasicResponse>(`${apiUrl}/poll/${id}`).pipe(map(data => data.data));
  }
}
