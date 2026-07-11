import {AsyncPipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    signal
} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {
    TuiButton,
    TuiInput,
    TuiLabel,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {TuiAvatar, type TuiFileLike, TuiFiles} from '@taiga-ui/kit';
import {
    catchError,
    EMPTY,
    finalize,
    map,
    of,
    Subject,
    switchMap,
    tap
} from 'rxjs';

import {AstushaUser} from '../../../../shared/interfaces';
import {UsersService} from '../../../auth/services/users.service';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

const ALLOWED_AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

@Component({
    selector: 'app-profile-settings-card',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TuiAvatar,
        TuiButton,
        TuiFiles,
        TuiInput,
        TuiLabel,
        TuiTextfield
    ],
    templateUrl: './profile-settings-card.component.html',
    styleUrl: './profile-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsCardComponent {
    private readonly usersService = inject(UsersService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly currentUser = toSignal(this.usersService.currentUser$, {
        initialValue: null
    });
    protected readonly isEditing = signal(false);
    protected readonly isSaving = signal(false);
    protected readonly isAvatarDeleting = signal(false);
    protected readonly avatarPreviewUrl = signal<string | null>(null);

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

    protected readonly avatarControl = new FormControl<TuiFileLike | null>(
        null
    );

    protected readonly failedAvatarFiles$ = new Subject<TuiFileLike | null>();

    protected readonly loadingAvatarFiles$ = new Subject<TuiFileLike | null>();

    protected readonly loadedAvatarFiles$ =
        this.avatarControl.valueChanges.pipe(
            switchMap(file => this.processAvatarFile(file))
        );

    constructor() {
        effect(() => {
            const user = this.currentUser();

            if (user && !this.isEditing()) {
                this.patchForm(user);
            }
        });
    }

    protected startEditing() {
        this.isEditing.set(true);
    }

    protected cancelEditing() {
        this.patchForm(this.currentUser());
        this.removeAvatarFile();

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

                    this.showSuccess(
                        'Изменения профиля успешно сохранены',
                        'Профиль обновлён'
                    );
                }),
                catchError(() => {
                    this.showError(
                        'Не удалось сохранить изменения профиля',
                        'Ошибка'
                    );

                    return EMPTY;
                }),
                finalize(() => {
                    this.isSaving.set(false);
                })
            )
            .subscribe();
    }

    protected removeAvatarFile() {
        this.avatarControl.setValue(null);
        this.failedAvatarFiles$.next(null);
        this.loadingAvatarFiles$.next(null);
        this.avatarPreviewUrl.set(null);
    }

    protected deleteAvatar() {
        this.isAvatarDeleting.set(true);

        this.usersService
            .deleteAvatar()
            .pipe(
                tap(() => {
                    this.removeAvatarFile();

                    this.showSuccess('Фото профиля удалено', 'Аватар обновлён');
                }),
                catchError(() => {
                    this.showError('Не удалось удалить фото профиля', 'Ошибка');

                    return EMPTY;
                }),
                finalize(() => {
                    this.isAvatarDeleting.set(false);
                })
            )
            .subscribe();
    }

    private processAvatarFile(file: TuiFileLike | null) {
        this.failedAvatarFiles$.next(null);
        this.avatarPreviewUrl.set(null);

        if (!file) {
            return of(null);
        }

        if (!(file instanceof File)) {
            this.failedAvatarFiles$.next(file);

            return of(null);
        }

        if (!this.isValidAvatar(file)) {
            this.failedAvatarFiles$.next(file);

            return of(null);
        }

        const previewUrl = URL.createObjectURL(file);

        this.avatarPreviewUrl.set(previewUrl);
        this.loadingAvatarFiles$.next(file);

        return this.usersService.uploadAvatar(file).pipe(
            tap(() => {
                this.avatarPreviewUrl.set(null);

                this.showSuccess(
                    'Фото профиля успешно обновлено',
                    'Аватар обновлён'
                );
            }),
            map(() => file),
            catchError(() => {
                this.failedAvatarFiles$.next(file);
                this.avatarPreviewUrl.set(null);

                this.showError('Не удалось загрузить фото профиля', 'Ошибка');

                return of(null);
            }),
            finalize(() => {
                this.loadingAvatarFiles$.next(null);
                URL.revokeObjectURL(previewUrl);
            })
        );
    }

    private patchForm(user: AstushaUser | null) {
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

    private isValidAvatar(file: File) {
        if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
            this.showError(
                'Можно загрузить только JPEG, PNG или WEBP',
                'Некорректный файл'
            );

            return false;
        }

        if (file.size > MAX_AVATAR_SIZE) {
            this.showError(
                'Размер файла не должен превышать 5 МБ',
                'Файл слишком большой'
            );

            return false;
        }

        return true;
    }

    private showSuccess(message: string, label: string) {
        this.alerts
            .open(message, {
                label,
                appearance: 'positive'
            })
            .subscribe();
    }

    private showError(message: string, label: string) {
        this.alerts
            .open(message, {
                label,
                appearance: 'negative'
            })
            .subscribe();
    }
}
