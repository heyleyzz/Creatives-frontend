import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { authInterceptor } from './interceptors/auth.interceptor'
import { errorInterceptor } from './interceptors/error-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    // ✅ Drag & Drop support
    importProvidersFrom(DragDropModule)
  ]
};