import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import {
    TuiButton,
    TuiIcon,
    TuiInput,
    TuiLabel,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {UsersService} from '../../../auth/services/users.service';
import {AstushaUser} from '../../../../shared/interfaces';
import {TuiSkeleton} from '@taiga-ui/kit';

@Component({
    selector: 'app-profile-settings-card',
    imports: [
        ReactiveFormsModule,
        TuiButton,
        TuiIcon,
        TuiTextfield,
        TuiInput,
        TuiLabel,
        TuiSkeleton
    ],
    templateUrl: './profile-settings-card.component.html',
    styleUrl: './profile-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsCardComponent {
    readonly currentUser = input<AstushaUser | null>(null);
    readonly isLoading = input(false);

    private readonly usersService = inject(UsersService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isEditing = signal(false);
    protected readonly isSaving = signal(false);

    protected readonly form = new FormGroup({
        firstName: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(50)]
        }),
        lastName: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(50)]
        }),
        position: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(100)]
        }),
        about: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(1000)]
        })
    });

    constructor() {
        effect(() => {
            this.patchForm();
        });
    }

    protected startEditing() {
        this.isEditing.set(true);
    }

    protected cancelEditing() {
        this.patchForm();

        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.isEditing.set(false);
    }

    protected saveEdits() {
        this.form.markAllAsTouched();

        if (this.form.invalid) {
            return;
        }

        this.isSaving.set(true);

        this.usersService
            .editProfile(this.form.getRawValue())
            .pipe(
                tap(user => {
                    this.patchForm(user);
                    this.form.markAsPristine();
                    this.form.markAsUntouched();
                    this.isEditing.set(false);
                    this.alerts
                        .open('Изменения профиля успешно сохранены', {
                            label: 'Профиль обновлён',
                            appearance: 'positive'
                        })
                        .subscribe();
                }),
                catchError(() => EMPTY),
                finalize(() => {
                    this.isSaving.set(false);
                })
            )
            .subscribe();
    }

    private patchForm(user = this.currentUser()) {
        if (!user) {
            return;
        }

        this.form.patchValue({
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            position: user.position ?? '',
            about: user.about ?? ''
        });
    }
}
