import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {UsersService} from '../../../../auth/services/users.service';
import {ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import {
    TuiIcon,
    TuiButton,
    TuiTextfield,
    TuiInput,
    TuiLabel,
    type TuiDialogContext,
    TuiError
} from '@taiga-ui/core';
import {finalize, tap} from 'rxjs';
import {injectContext} from '@taiga-ui/polymorpheus';
import {TuiButtonLoading, TuiPassword} from '@taiga-ui/kit';

@Component({
    selector: 'app-delete-profile-dialog',
    imports: [
        ReactiveFormsModule,
        TuiTextfield,
        TuiIcon,
        TuiButton,
        TuiInput,
        TuiLabel,
        TuiError,
        TuiIcon,
        TuiPassword,
        TuiButtonLoading
    ],
    templateUrl: './delete-profile-dialog.component.html',
    styleUrl: './delete-profile-dialog.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProfileDialogComponent {
    protected readonly context =
        injectContext<TuiDialogContext<boolean, string>>();
    private readonly usersService = inject(UsersService);

    protected readonly isDeleting = signal(false);

    protected readonly password = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
    });

    protected deleteAccount() {
        this.password.markAsTouched();

        if (this.password.invalid) {
            return;
        }
        this.isDeleting.set(true);

        const text = this.password.value;
        const payload = {password: text};

        this.usersService
            .deleteAccount(payload)
            .pipe(
                tap(() => {
                    this.context.completeWith(true);
                }),
                finalize(() => {
                    this.isDeleting.set(false);
                })
            )
            .subscribe();
    }
}
