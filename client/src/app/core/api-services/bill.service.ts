import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasicResponse } from '../core.types';
import { map } from 'rxjs/operators';
import { HttpService } from '../common-services/http.service';
import { environment } from '../../../environments/environment';
import { IBill, IBillCreateBody, IBillCreateResponse, IStatusObmenkaResponse } from '../interfaces/bill/bill.types';

const apiUrl = environment.UI_SERVER;

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpService) {}

  create(body: IBillCreateBody): Observable<IBillCreateResponse> {
    return this.http
      .post<IBasicResponse<IBillCreateResponse>>(`${apiUrl}/bill/create`, body)
      .pipe(map((data) => data.data));
  }

  history(): Observable<IBill[]> {
    return this.http.get<IBasicResponse<IBill[]>>(`${apiUrl}/bill/history`).pipe(map((data) => data.data));
  }

  removeById(billId: string): Observable<IBasicResponse> {
    return this.http.delete<IBasicResponse<IBill[]>>(`${apiUrl}/bill/remove/${billId}`);
  }

  checkBillStatusObmenka(billId: string): Observable<IBasicResponse<IStatusObmenkaResponse>> {
    return this.http.get<IBasicResponse<IStatusObmenkaResponse>>(`${apiUrl}/bill/status/obmenka?invoiceId=${billId}`);
  }
}
