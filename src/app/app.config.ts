import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // 🔥 ADD THIS (Drag & Drop support)
    importProvidersFrom(DragDropModule)
  ]
};