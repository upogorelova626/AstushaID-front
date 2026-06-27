import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login'
    },
    {
        path: 'auth',
        loadComponent: () =>
            import('./layout/auth-layout/auth-layout/auth-layout.component').then(
                m => m.AuthLayoutComponent
            ),
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./features/auth/pages/login-page/login-page.component').then(
                        m => m.LoginPageComponent
                    )
            },
            {
                path: 'create-account',
                loadComponent: () =>
                    import('./features/auth/pages/create-account-page/create-account-page.component').then(
                        m => m.CreateAccountPageComponent
                    )
            },
            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('./features/auth/pages/forgot-password-page/forgot-password-page.component').then(
                        m => m.ForgotPasswordPageComponent
                    )
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('./features/auth/pages/reset-password-page/reset-password-page.component').then(
                        m => m.ResetPasswordPageComponent
                    )
            }
        ]
    },
    {
        path: 'app',
        loadComponent: () =>
            import('./layout/app-layout/app-layout/app-layout.component').then(
                m => m.AppLayoutComponent
            ),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
