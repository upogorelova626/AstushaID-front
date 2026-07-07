import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {
    TuiButton,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiTextfield,
    TuiCheckbox,
    TuiNotificationService
} from '@taiga-ui/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {catchError, EMPTY, tap} from 'rxjs';
import {TuiError} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';

@Component({
    selector: 'app-login-page',
    imports: [
        TuiTextfield,
        TuiInput,
        TuiButton,
        TuiLink,
        TuiError,
        TuiIcon,
        TuiCheckbox,
        TuiPassword,
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly loginError = signal(false);

    protected readonly loginForm = new FormGroup({
        loginOrEmail: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(254)]
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    protected login() {
        this.loginError.set(false);

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();

            return;
        }

        const formValue = this.loginForm.getRawValue();

        const loginPayload = {
            loginOrEmail: formValue.loginOrEmail.trim(),
            password: formValue.password
        };

        this.authService
            .login(loginPayload)
            .pipe(
                tap(response => {
                    const returnUrl =
                        this.route.snapshot.queryParamMap.get('returnUrl');

                    if ('twoFactorRequired' in response) {
                        sessionStorage.setItem(
                            'emailTwoFactorChallengeId',
                            response.challengeId
                        );

                        sessionStorage.setItem(
                            'emailTwoFactorEmail',
                            response.email
                        );

                        if (returnUrl) {
                            sessionStorage.setItem(
                                'emailTwoFactorReturnUrl',
                                returnUrl
                            );
                        } else {
                            sessionStorage.removeItem(
                                'emailTwoFactorReturnUrl'
                            );
                        }

                        void this.router.navigate(['/auth/two-factor']);

                        return;
                    }

                    if (returnUrl) {
                        window.location.href = returnUrl;

                        return;
                    }

                    void this.router.navigate(['/account/profile']);
                }),
                catchError(() => {
                    this.loginError.set(true);

                    sessionStorage.removeItem('emailTwoFactorChallengeId');
                    sessionStorage.removeItem('emailTwoFactorEmail');
                    sessionStorage.removeItem('emailTwoFactorReturnUrl');

                    this.alerts
                        .open('Неверный логин/email или пароль', {
                            label: 'Не удалось войти',
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                })
            )
            .subscribe();
    }
}
