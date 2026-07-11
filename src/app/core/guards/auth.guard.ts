import {CanActivateFn, Router} from '@angular/router';
import {UsersService} from '../../features/auth/services/users.service';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = (_route, state) => {
    const usersService = inject(UsersService);
    const router = inject(Router);

    return usersService.getMe().pipe(
        map(() => true),
        catchError(() => {
            console.log('authGuard');
            return of(
                router.createUrlTree(['/auth/login'], {
                    queryParams: {returnUrl: state.url}
                })
            );
        })
    );
};
