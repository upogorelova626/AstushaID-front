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
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {catchError, EMPTY, tap} from 'rxjs';
import {TuiError} from '@taiga-ui/core';

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
                tap(() => {
                    void this.router.navigate(['/']);
                }),
                catchError(() => {
                    this.loginError.set(true);

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
