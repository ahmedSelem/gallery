import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { UploaderModule } from 'angular-uploader';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideToastr(),
    importProvidersFrom(HttpClientModule, UploaderModule, RouterModule.forRoot(routes)),
    
],
});
