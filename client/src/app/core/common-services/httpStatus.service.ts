import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusService {
  private httpActivity = false;
  private requestInFlight$: BehaviorSubject<number> = new BehaviorSubject(0);
  public timeout: any;
  public requestCounter = 0;
  constructor(private ngxLoader: NgxUiLoaderService) {
    this.getHttpStatus().subscribe((status: number) => {
      if (this.httpActivity !== !!status) {
        this.httpActivity = !!status;
        switch (this.httpActivity) {
          case true: {
            this.ngxLoader.start();
            break;
          }
          case false: {
            this.ngxLoader.stop();
            break;
          }
        }
      }
    });
  }

  setHttpStatus(inFlight: boolean) {
    if (inFlight) {
      this.requestInFlight$.next(++this.requestCounter);
    } else {
      if (this.requestCounter === 1) {
        this.timeout = setTimeout(() => {
          this.requestInFlight$.next(--this.requestCounter);
        }, 100);
      } else {
        this.requestInFlight$.next(--this.requestCounter);
      }
    }
  }

  getHttpStatus(): Observable<number> {
    return this.requestInFlight$.asObservable();
  }
}
