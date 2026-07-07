import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
    TuiButton,
    TuiLink,
    TuiLoader,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {TuiInputPin, TuiButtonLoading} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize, tap} from 'rxjs';

import {AuthService} from '../../services/auth.service';

const CHALLENGE_ID_STORAGE_KEY = 'emailTwoFactorChallengeId';
const EMAIL_STORAGE_KEY = 'emailTwoFactorEmail';
const RETURN_URL_STORAGE_KEY = 'emailTwoFactorReturnUrl';

@Component({
    selector: 'app-two-factor-page',
    imports: [
        TuiTextfield,
        TuiInputPin,
        TuiButton,
        TuiButtonLoading,
        TuiLink,
        TuiLoader,
        ReactiveFormsModule
    ],
    templateUrl: './two-factor-page.component.html',
    styleUrl: './two-factor-page.component.less'
})
export class TwoFactorPageComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isLoading = signal(false);
    protected readonly isPageLoading = signal(true);
    protected readonly email = signal<string | null>(null);

    protected readonly code = new FormControl('', {
        nonNullable: true,
        validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern(/^\d{6}$/)
        ]
    });

    ngOnInit() {
        const challengeId = sessionStorage.getItem(CHALLENGE_ID_STORAGE_KEY);
        const email = sessionStorage.getItem(EMAIL_STORAGE_KEY);

        if (!challengeId) {
            this.isPageLoading.set(false);
            void this.router.navigate(['/auth/login']);

            return;
        }

        this.email.set(email);
        this.isPageLoading.set(false);

        this.code.valueChanges.subscribe(value => {
            const normalizedValue = value.replace(/\D/g, '').slice(0, 6);

            if (value !== normalizedValue) {
                this.code.setValue(normalizedValue, {
                    emitEvent: false
                });
            }
        });
    }

    protected verifyCode() {
        this.code.markAsTouched();

        if (this.code.invalid) {
            return;
        }

        const challengeId = sessionStorage.getItem(CHALLENGE_ID_STORAGE_KEY);

        if (!challengeId) {
            void this.router.navigate(['/auth/login']);

            return;
        }

        this.isLoading.set(true);

        this.authService
            .verifyEmailTwoFactor({
                challengeId,
                code: this.code.value
            })
            .pipe(
                tap(() => {
                    const returnUrl = sessionStorage.getItem(
                        RETURN_URL_STORAGE_KEY
                    );

                    this.clearTwoFactorStorage();

                    this.alerts
                        .open('Вход успешно подтверждён', {
                            label: 'Готово',
                            appearance: 'positive'
                        })
                        .subscribe();

                    if (returnUrl) {
                        window.location.href = returnUrl;

                        return;
                    }

                    void this.router.navigate(['/account/profile']);
                }),
                catchError(() => {
                    this.code.setValue('', {
                        emitEvent: false
                    });

                    this.code.setErrors({
                        invalidCode: true
                    });

                    this.alerts
                        .open('Код подтверждения неверный или устарел', {
                            label: 'Не удалось подтвердить вход',
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe();
    }

    protected backToLogin() {
        this.clearTwoFactorStorage();

        void this.router.navigate(['/auth/login']);
    }

    private clearTwoFactorStorage() {
        sessionStorage.removeItem(CHALLENGE_ID_STORAGE_KEY);
        sessionStorage.removeItem(EMAIL_STORAGE_KEY);
        sessionStorage.removeItem(RETURN_URL_STORAGE_KEY);
    }
}
