import { ErrorinterceptorInterceptor } from './app/core/interceptors/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter, withHashLocation } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { UploaderModule } from 'angular-uploader';
import { routes } from './app/app-routing.module';
import { LoadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes, withHashLocation()),
    provideToastr(),
    importProvidersFrom(
      HttpClientModule,
      UploaderModule,
      RouterModule.forRoot(routes),
      ModalModule.forRoot()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorinterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
});
