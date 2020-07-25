import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutsModule } from '@layouts/layouts.module';
import { InitAppService } from '@core/common-services/init-app.service';
import { ngxUiLoaderConfig } from '@core/constants/loaderConfig';
import { CoreModule } from '@core/core.module';

export function appInit(initService: InitAppService) {
  return () => initService.initUser();
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    LayoutsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [InitAppService]
    },
    { provide: 'windowObject', useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
