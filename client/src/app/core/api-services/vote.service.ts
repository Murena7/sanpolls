import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasicResponse } from '../core.types';
import { map } from 'rxjs/operators';
import { HttpService } from '../common-services/http.service';
import { environment } from '../../../environments/environment';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpService) {}

  giveVote(body): Observable<IBasicResponse<any>> {
    return this.http.post<IBasicResponse<any>>(`${apiUrl}/vote/give`, body).pipe(map((data) => data.data));
  }
}
