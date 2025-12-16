import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { App } from './app/app';
import { routes } from './app/routes';

// Final main.ts
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(CommonModule),
  ],
});
