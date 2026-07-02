import {Component, inject, signal} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {
    TuiButton,
    TuiError,
    TuiIcon,
    TuiInput,
    TuiLabel,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize, switchMap, tap, timer} from 'rxjs';
import {passwordMatchValidator} from '../../../../core/validators/password-match.validator';
import {samePasswordValidator} from '../../../../core/validators/same-password.validator';
import {AuthService} from '../../../auth/services/auth.service';
import {UsersService} from '../../../auth/services/users.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-change-password-card',
    imports: [
        TuiButton,
        TuiTextfield,
        TuiInput,
        TuiLabel,
        TuiPassword,
        TuiIcon,
        TuiError,
        ReactiveFormsModule
    ],
    templateUrl: './change-password-card.component.html',
    styleUrl: './change-password-card.component.less'
})
export class ChangePasswordCardComponent {
    private readonly usersService = inject(UsersService);
    private readonly authService = inject(AuthService);
    private readonly alerts = inject(TuiNotificationService);
    private readonly router = inject(Router);

    protected readonly isSaving = signal(false);

    protected readonly form = new FormGroup(
        {
            currentPassword: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64)
                ]
            }),
            newPassword: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64)
                ]
            }),
            confirmNewPassword: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(64)
                ]
            })
        },
        {
            validators: [
                passwordMatchValidator('newPassword', 'confirmNewPassword'),
                samePasswordValidator()
            ]
        }
    );

    protected saveNewPassword() {
        if (this.isSaving()) {
            return;
        }

        this.form.markAllAsTouched();

        if (this.form.invalid) {
            return;
        }

        const {currentPassword, newPassword} = this.form.getRawValue();

        this.isSaving.set(true);

        this.usersService
            .editPassword({
                currentPassword,
                newPassword
            })
            .pipe(
                tap(() => {
                    this.alerts
                        .open('Войдите в аккаунт заново', {
                            label: 'Пароль успешно изменён',
                            appearance: 'positive'
                        })
                        .subscribe();
                }),
                switchMap(() => timer(2000)),
                switchMap(() => this.authService.logout()),
                tap(() => {
                    this.router.navigate(['/auth/login']);
                }),
                catchError(() => {
                    this.alerts
                        .open('Проверьте текущий пароль и попробуйте ещё раз', {
                            label: 'Не удалось изменить пароль',
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isSaving.set(false);
                })
            )
            .subscribe();
    }
}
