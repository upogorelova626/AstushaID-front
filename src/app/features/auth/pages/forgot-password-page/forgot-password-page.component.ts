import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {
    TuiButton,
    TuiError,
    TuiInput,
    TuiLink,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {catchError, EMPTY, finalize, switchMap, tap, timer} from 'rxjs';

import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-forgot-password-page',
    imports: [
        TuiTextfield,
        TuiInput,
        TuiButton,
        TuiLink,
        TuiError,
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './forgot-password-page.component.html',
    styleUrl: './forgot-password-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPageComponent {
    private readonly authService = inject(AuthService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly emailControl = new FormControl('', {
        nonNullable: true,
        validators: [
            Validators.required,
            Validators.email,
            Validators.maxLength(255)
        ]
    });

    protected readonly isLoading = signal(false);
    protected readonly isEmailSent = signal(false);

    protected requestPasswordReset() {
        if (this.emailControl.invalid || this.isLoading()) {
            this.emailControl.markAsTouched();

            return;
        }

        this.isLoading.set(true);

        this.authService
            .resetPasswordRequest({
                email: this.emailControl.value.trim()
            })
            .pipe(
                tap(() => {
                    this.alerts
                        .open(
                            'Если аккаунт с такой почтой существует, мы отправили письмо со ссылкой для сброса пароля.',
                            {
                                appearance: 'positive'
                            }
                        )
                        .subscribe();
                }),
                switchMap(() => timer(2000)),
                catchError(() => {
                    this.alerts
                        .open(
                            'Не удалось отправить письмо. Попробуйте позже.',
                            {
                                appearance: 'negative'
                            }
                        )
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe(() => {
                this.isEmailSent.set(true);
            });
    }
}
