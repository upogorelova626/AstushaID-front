import {AsyncPipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {
    TuiButton,
    TuiIcon,
    TuiInput,
    TuiLabel,
    TuiNotificationService,
    TuiTextfield
} from '@taiga-ui/core';
import {
    TuiAvatar,
    type TuiFileLike,
    TuiFiles,
    TuiSkeleton
} from '@taiga-ui/kit';
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

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Component({
    selector: 'app-profile-settings-card',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        TuiAvatar,
        TuiButton,
        TuiFiles,
        TuiIcon,
        TuiInput,
        TuiLabel,
        TuiSkeleton,
        TuiTextfield
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
    protected readonly isAvatarDeleting = signal(false);
    protected readonly localUser = signal<AstushaUser | null>(null);
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

    protected readonly control = new FormControl<TuiFileLike | null>(null);

    protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
    protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();

    protected readonly loadedFiles$ = this.control.valueChanges.pipe(
        switchMap(file => this.processFile(file))
    );

    constructor() {
        effect(() => {
            const user = this.currentUser();

            this.localUser.set(user);
            this.patchForm(user);
        });
    }

    protected startEditing() {
        this.isEditing.set(true);
    }

    protected cancelEditing() {
        this.patchForm(this.localUser());
        this.removeFile();

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
                    this.localUser.set(user);
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
                catchError(() => {
                    this.alerts
                        .open('Не удалось сохранить изменения профиля', {
                            label: 'Ошибка',
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

    protected removeFile() {
        this.control.setValue(null);
        this.failedFiles$.next(null);
        this.loadingFiles$.next(null);
        this.avatarPreviewUrl.set(null);
    }

    protected deleteAvatar() {
        this.isAvatarDeleting.set(true);

        this.usersService
            .deleteAvatar()
            .pipe(
                tap(user => {
                    this.localUser.set(user);
                    this.removeFile();

                    this.alerts
                        .open('Фото профиля удалено', {
                            label: 'Аватар обновлён',
                            appearance: 'positive'
                        })
                        .subscribe();
                }),
                catchError(() => {
                    this.alerts
                        .open('Не удалось удалить фото профиля', {
                            label: 'Ошибка',
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isAvatarDeleting.set(false);
                })
            )
            .subscribe();
    }

    protected processFile(file: TuiFileLike | null) {
        this.failedFiles$.next(null);

        if (!file) {
            return of(null);
        }

        if (!(file instanceof File)) {
            this.failedFiles$.next(file);

            return of(null);
        }

        if (!this.isValidAvatar(file)) {
            this.failedFiles$.next(file);

            return of(null);
        }

        const previewUrl = URL.createObjectURL(file);

        this.avatarPreviewUrl.set(previewUrl);
        this.loadingFiles$.next(file);

        return this.usersService.uploadAvatar(file).pipe(
            map(user => {
                this.localUser.set(user);
                this.avatarPreviewUrl.set(null);

                this.alerts
                    .open('Фото профиля успешно обновлено', {
                        label: 'Аватар обновлён',
                        appearance: 'positive'
                    })
                    .subscribe();

                return file;
            }),
            catchError(() => {
                this.failedFiles$.next(file);
                this.avatarPreviewUrl.set(null);

                this.alerts
                    .open('Не удалось загрузить фото профиля', {
                        label: 'Ошибка',
                        appearance: 'negative'
                    })
                    .subscribe();

                return of(null);
            }),
            finalize(() => {
                this.loadingFiles$.next(null);
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
        if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
            this.alerts
                .open('Можно загрузить только JPEG, PNG или WEBP', {
                    label: 'Некорректный файл',
                    appearance: 'negative'
                })
                .subscribe();

            return false;
        }

        if (file.size > MAX_AVATAR_SIZE) {
            this.alerts
                .open('Размер файла не должен превышать 5 МБ', {
                    label: 'Файл слишком большой',
                    appearance: 'negative'
                })
                .subscribe();

            return false;
        }

        return true;
    }
}
