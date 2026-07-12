import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account/profile'
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
            },
            {
                path: 'two-factor',
                loadComponent: () =>
                    import('./features/auth/pages/two-factor-page/two-factor-page.component').then(
                        m => m.TwoFactorPageComponent
                    )
            }
        ]
    },
    {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./layout/app-layout/app-layout/app-layout.component').then(
                m => m.AppLayoutComponent
            ),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./features/profile/pages/profile-page/profile-page.component').then(
                        m => m.ProfilePageComponent
                    )
            },
            {
                path: 'applications',
                loadComponent: () =>
                    import('./features/applications/pages/application-page/application-page.component').then(
                        m => m.ApplicationPageComponent
                    )
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./features/settings/pages/settings-page/settings-page.component').then(
                        m => m.SettingsPageComponent
                    )
            },
            {
                path: 'security',
                loadComponent: () =>
                    import('./features/security-settings/pages/security-settings-page/security-settings-page.component').then(
                        m => m.SecuritySettingsPageComponent
                    )
            },
            {
                path: 'notifications',
                loadComponent: () =>
                    import('./features/notifications/pages/notifications-settings-page/notifications-settings-page.component').then(
                        m => m.NotificationsSettingsPageComponent
                    )
            }
        ]
    },

    {
        path: '**',
        loadComponent: () =>
            import('./shared/components/error-page/error-page.component').then(
                ({ErrorPageComponent}) => ErrorPageComponent
            )
    }
];
