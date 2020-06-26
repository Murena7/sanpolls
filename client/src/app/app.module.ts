import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutsModule } from '@layouts/layouts.module';
import { JwtInterceptor } from '@core/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@core/helpers/error.interceptor';
import { InitAppService } from '@core/services/init-app.service';
import { ngxUiLoaderConfig } from '@core/constants/loaderConfig';

export function appInit(initService: InitAppService) {
  return () => initService.initUser();
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [InitAppService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
