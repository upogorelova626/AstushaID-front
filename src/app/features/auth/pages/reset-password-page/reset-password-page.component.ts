import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
    TuiButton,
    TuiError,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {passwordMatchValidator} from '../../../../core/validators/password-match.validator';

@Component({
    selector: 'app-reset-password-page',
    imports: [
        ReactiveFormsModule,
        RouterLink,
        TuiButton,
        TuiError,
        TuiIcon,
        TuiInput,
        TuiLink,
        TuiPassword,
        TuiTextfield
    ],
    templateUrl: './reset-password-page.component.html',
    styleUrl: './reset-password-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPageComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiNotificationService);

    private readonly token = signal<string | null>(null);

    protected readonly isLoading = signal(false);

    protected readonly resetPasswordForm = new FormGroup(
        {
            newPassword: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64)
                ]
            }),
            confirmPassword: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64)
                ]
            })
        },
        {
            validators: passwordMatchValidator('newPassword', 'confirmPassword')
        }
    );

    ngOnInit() {
        const token = this.route.snapshot.queryParamMap.get('token');

        if (!token) {
            this.router.navigate(['/auth/forgot-password']);

            return;
        }

        this.token.set(token);
    }

    protected resetPassword() {
        if (this.resetPasswordForm.invalid || this.isLoading()) {
            this.resetPasswordForm.markAllAsTouched();

            return;
        }

        const token = this.token();

        if (!token) {
            this.router.navigate(['/auth/forgot-password']);

            return;
        }

        this.isLoading.set(true);

        this.authService
            .confirmPasswordReset({
                token,
                newPassword: this.resetPasswordForm.controls.newPassword.value
            })
            .pipe(
                catchError(() => {
                    this.alerts
                        .open(
                            'Ссылка для сброса пароля недействительна или устарела.',
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
                this.alerts
                    .open('Пароль успешно изменён', {
                        appearance: 'positive'
                    })
                    .subscribe();

                this.router.navigate(['/auth/login']);
            });
    }
}
