import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {
    catchError,
    finalize,
    Observable,
    shareReplay,
    switchMap,
    throwError
} from 'rxjs';

import {AuthService} from '../../features/auth/services/auth.service';

const baseApiUrl = 'http://localhost:3002';

let refreshRequest$: Observable<unknown> | null = null;

export const credentialsInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!request.url.startsWith(baseApiUrl)) {
        return next(request);
    }

    const requestWithCredentials = request.clone({
        withCredentials: true
    });

    return next(requestWithCredentials).pipe(
        catchError((error: unknown) => {
            const isUnauthorized =
                error instanceof HttpErrorResponse && error.status === 401;

            const isLoginRequest = request.url.includes('/auth/login');
            const isRefreshRequest = request.url.includes('/auth/refresh');
            const isTwoFactorRequest = request.url.includes(
                '/auth/two-factor/email/verify'
            );
            const isLogoutRequest = request.url.includes('/auth/logout');

            if (
                !isUnauthorized ||
                isLoginRequest ||
                isRefreshRequest ||
                isTwoFactorRequest ||
                isLogoutRequest
            ) {
                return throwError(() => error);
            }

            if (!refreshRequest$) {
                refreshRequest$ = authService.refresh().pipe(
                    catchError((refreshError: unknown) => {
                        void router.navigate(['/auth/login']);

                        return throwError(() => refreshError);
                    }),
                    finalize(() => {
                        refreshRequest$ = null;
                    }),
                    shareReplay(1)
                );
            }

            return refreshRequest$.pipe(
                switchMap(() => next(requestWithCredentials))
            );
        })
    );
};
