import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { LoaderInterceptor } from '@core/interceptors/loader.interceptor';
import { WithCredentialsInterceptor } from '@core/interceptors/withCredentials.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ErrorInterceptor, LoaderInterceptor, WithCredentialsInterceptor],
})
export class CoreModule {}
