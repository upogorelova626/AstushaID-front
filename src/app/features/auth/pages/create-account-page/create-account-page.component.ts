import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {
    TuiButton,
    TuiCheckbox,
    TuiError,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {TuiPassword} from '@taiga-ui/kit';
import {passwordMatchValidator} from '../../../../core/validators/password-match.validator';
import {catchError, EMPTY, tap} from 'rxjs';

@Component({
    selector: 'app-create-account-page',
    imports: [
        TuiButton,
        TuiInput,
        TuiLink,
        TuiTextfield,
        RouterLink,
        ReactiveFormsModule,
        TuiError,
        TuiPassword,
        TuiIcon,
        TuiCheckbox
    ],
    templateUrl: './create-account-page.component.html',
    styleUrl: './create-account-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountPageComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly registerError = signal(false);

    protected readonly createAccountForm = new FormGroup(
        {
            login: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30)
                ]
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(254)
                ]
            }),
            password: new FormControl('', {
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
            }),
            agreement: new FormControl(false, {
                nonNullable: true,
                validators: [Validators.requiredTrue]
            })
        },
        {
            validators: passwordMatchValidator()
        }
    );

    protected createAccount() {
        this.registerError.set(false);

        if (this.createAccountForm.invalid) {
            this.createAccountForm.markAllAsTouched();
            console.log(this.createAccountForm);

            return;
        }
        const formValue = this.createAccountForm.getRawValue();

        const createAccountPayload = {
            login: formValue.login.trim(),
            email: formValue.email.trim(),
            password: formValue.password
        };

        this.authService
            .createAccount(createAccountPayload)
            .pipe(
                tap(() => {
                    void this.router.navigate(['/']);
                }),
                catchError(() => {
                    this.registerError.set(true);

                    this.alerts
                        .open('Не удалось создать аккаунт', {
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                })
            )
            .subscribe();
    }
}
