import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {
    FormGroup,
    ReactiveFormsModule,
    FormControl,
    Validators
} from '@angular/forms';
import {
    TuiButton,
    TuiError,
    TuiIcon,
    TuiInput,
    TuiLabel,
    TuiTextfield,
    type TuiDialogContext
} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';
import {injectContext} from '@taiga-ui/polymorpheus';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {passwordMatchValidator} from '../../../../../core/validators/password-match.validator';
import {samePasswordValidator} from '../../../../../core/validators/same-password.validator';
import {UsersService} from '../../../../auth/services/users.service';

@Component({
    selector: 'app-change-password-dialog',
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
    templateUrl: './change-password-dialog.component.html',
    styleUrl: './change-password-dialog.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordDialogComponent {
    protected readonly context =
        injectContext<TuiDialogContext<boolean, void>>();

    private readonly usersService = inject(UsersService);

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
                    this.context.completeWith(true);
                }),
                catchError(() => EMPTY),
                finalize(() => {
                    this.isSaving.set(false);
                })
            )
            .subscribe();
    }
}
