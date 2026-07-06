import {Component, inject, OnInit, signal} from '@angular/core';
import {TuiButton, TuiIcon, TuiNotificationService} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton, TuiSwitch} from '@taiga-ui/kit';
import {UsersService} from '../../../auth/services/users.service';
import {catchError, EMPTY, finalize, tap} from 'rxjs';
import {ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
    selector: 'app-two-factor-auth-card',
    imports: [TuiAvatar, TuiSwitch, TuiSkeleton, ReactiveFormsModule],
    templateUrl: './two-factor-auth-card.component.html',
    styleUrl: './two-factor-auth-card.component.less'
})
export class TwoFactorAuthCardComponent implements OnInit {
    private readonly usersService = inject(UsersService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isTwoFactorEnabled = signal(false);
    protected readonly isLoading = signal(false);
    protected readonly isSaving = signal(false);

    protected readonly control = new FormControl(false, {nonNullable: true});

    ngOnInit(): void {
        this.isLoading.set(true);
        this.control.disable({emitEvent: false});

        this.usersService
            .getMe()
            .pipe(
                tap(me => {
                    this.isTwoFactorEnabled.set(me.emailTwoFactorEnabled);
                    this.control.setValue(me.emailTwoFactorEnabled, {
                        emitEvent: false
                    });
                }),
                finalize(() => {
                    this.isLoading.set(false);
                    this.control.enable({emitEvent: false});
                })
            )
            .subscribe();
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
                            {
                                label: 'Безопасность',
                                appearance: 'positive'
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
