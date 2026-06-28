import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideTaiga, tuiValidationErrorsProvider} from '@taiga-ui/core';
import {routes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {VALIDATION_ERRORS} from './shared/validation/validation-errors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideTaiga(),
        tuiValidationErrorsProvider(VALIDATION_ERRORS)
    ]
};
