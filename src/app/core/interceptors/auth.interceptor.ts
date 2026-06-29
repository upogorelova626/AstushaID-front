import {HttpInterceptorFn} from '@angular/common/http';

const API_URL = 'http://localhost:3002';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const isApiRequest = request.url.startsWith(API_URL);

    if (!isApiRequest) {
        return next(request);
    }

    return next(request.clone({withCredentials: true}));
};
