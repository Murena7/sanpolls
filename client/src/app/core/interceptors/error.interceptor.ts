import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private snackBarNotificationService: SnackbarNotificationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService.logout();
          this.router.navigate(['/login']).then(() => {
            location.reload(true);
          });
        }

        const error = err.error.errors.message || err.error.message || err.statusText;
        this.snackBarNotificationService.error(`Ошибка ${error}`);
        return throwError(err);
      })
    );
  }
}
