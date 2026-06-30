import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
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

            const isCreateAccountRequest = request.url.includes(
                '/auth/create-account'
            );
            const isLoginRequest = request.url.includes('/auth/login');
            const isRefreshRequest = request.url.includes('/auth/refresh');
            const isLogoutRequest = request.url.includes('/auth/logout');

            if (
                !isUnauthorized ||
                isCreateAccountRequest ||
                isLoginRequest ||
                isRefreshRequest ||
                isLogoutRequest
            ) {
                return throwError(() => error);
            }

            if (!refreshRequest$) {
                refreshRequest$ = authService.refresh().pipe(
                    shareReplay(1),
                    finalize(() => {
                        refreshRequest$ = null;
                    })
                );
            }

            return refreshRequest$.pipe(
                switchMap(() => next(requestWithCredentials)),
                catchError((refreshError: unknown) =>
                    throwError(() => refreshError)
                )
            );
        })
    );
};
