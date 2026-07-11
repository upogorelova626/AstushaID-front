import {Component, effect, inject, signal} from '@angular/core';
import {TuiNotificationService} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';
import {UsersService} from '../../../auth/services/users.service';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-two-factor-auth-card',
    imports: [TuiAvatar, TuiSwitch, ReactiveFormsModule],
    templateUrl: './two-factor-auth-card.component.html',
    styleUrl: './two-factor-auth-card.component.less'
})
export class TwoFactorAuthCardComponent {
    private readonly usersService = inject(UsersService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isSaving = signal(false);
    protected readonly me = toSignal(this.usersService.currentUser$, {
        initialValue: null
    });

    constructor() {
        effect(() => {
            const me = this.me();
            if (!me) {
                return;
            }

            this.control.setValue(me.emailTwoFactorEnabled, {emitEvent: false});
        });
    }

    protected readonly control = new FormControl(false, {nonNullable: true});

    protected toggleTwoFactor() {
        const enable = this.control.value;
        const previousValue = !enable;

        this.isSaving.set(true);
        this.control.disable({emitEvent: false});

        this.usersService
            .changeEmailTwoFactor({enabled: enable})
            .pipe(
                tap(user => {
                    this.alerts
                        .open(
                            user.emailTwoFactorEnabled
                                ? 'Двухфакторная аутентификация включена'
                                : 'Двухфакторная аутентификация выключена',
                            {
                                label: 'Безопасность',
                                appearance: 'positive'
                            }
                        )
                        .subscribe();
                }),
                catchError(() => {
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
