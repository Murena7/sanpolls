import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { JwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { LoaderInterceptor } from '@core/interceptors/loader.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ErrorInterceptor, JwtInterceptor, LoaderInterceptor],
})
export class CoreModule {}
