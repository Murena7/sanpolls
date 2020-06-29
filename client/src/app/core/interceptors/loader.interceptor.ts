import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpStatusService } from '@core/common-services/httpStatus.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private status: HttpStatusService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
