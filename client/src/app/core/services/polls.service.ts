import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpClient) {}

  getPolls(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/polls`);
  }
}
