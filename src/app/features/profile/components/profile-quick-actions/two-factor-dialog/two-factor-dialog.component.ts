import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    signal
} from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {
    type TuiDialogContext,
    TuiInput,
    TuiNotificationService
} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton, TuiSwitch} from '@taiga-ui/kit';
import {injectContext} from '@taiga-ui/polymorpheus';
import {UsersService} from '../../../../auth/services/users.service';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-two-factor-dialog',
    imports: [TuiInput, TuiSwitch, ReactiveFormsModule, TuiAvatar, TuiSkeleton],
    templateUrl: './two-factor-dialog.component.html',
    styleUrl: './two-factor-dialog.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoFactorDialogComponent {
    protected readonly context = injectContext<TuiDialogContext<void, void>>();

    private readonly usersService = inject(UsersService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isTwoFactorEnabled = signal(false);
    protected readonly isLoading = signal(false);
    protected readonly isSaving = signal(false);

    protected readonly currentUser = toSignal(this.usersService.currentUser$);

    protected readonly control = new FormControl(false, {nonNullable: true});

    constructor() {
        effect(() => {
            const currentUser = this.currentUser();
            if (!currentUser) {
                return;
            }

            this.control.setValue(currentUser.emailTwoFactorEnabled, {
                emitEvent: false
            });
        });
    }

    protected toggleTwoFactor() {
        const enable = this.control.value;
        const previousValue = !enable;

        this.isSaving.set(true);
        this.control.disable({emitEvent: false});

        this.usersService
            .changeEmailTwoFactor({enabled: enable})
            .pipe(
                tap(user => {
                    this.isTwoFactorEnabled.set(user.emailTwoFactorEnabled);
                    this.control.setValue(user.emailTwoFactorEnabled, {
                        emitEvent: false
                    });

                    this.alerts
                        .open(
                            user.emailTwoFactorEnabled
                                ? 'Двухфакторная аутентификация включена'
                                : 'Двухфакторная аутентификация выключена',
                            user.emailTwoFactorEnabled
                                ? {
                                      label: 'Безопасность',
                                      appearance: 'positive'
                                  }
                                : {
                                      label: 'Безопасность',
                                      appearance: 'negative'
                                  }
                        )
                        .subscribe();
                }),
                catchError(() => {
                    this.isTwoFactorEnabled.set(previousValue);
                    this.control.setValue(previousValue, {
                        emitEvent: false
                    });

                    this.alerts
                        .open(
                            'Не удалось изменить настройку двухфакторной аутентификации',
                            {
                                label: 'Ошибка',
                                appearance: 'negative'
                            }
                        )
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isSaving.set(false);
                    this.control.enable({emitEvent: false});
                })
            )
            .subscribe();
    }
}
