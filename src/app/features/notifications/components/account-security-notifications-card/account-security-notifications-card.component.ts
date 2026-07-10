import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiIcon, TuiNotificationService} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton, TuiSwitch} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize, tap} from 'rxjs';

import {NotificationSettings} from '../../../../shared/interfaces';
import {NotificationSettingsService} from '../../../../shared/services/notification-settings.service';

interface SecurityNotificationsFormValue {
    login: boolean;
    changePassword: boolean;
    sessionsFinished: boolean;
    twoFactorNotifications: boolean;
}

@Component({
    selector: 'app-account-security-notifications-card',
    imports: [TuiIcon, TuiSwitch, TuiAvatar, TuiSkeleton, ReactiveFormsModule],
    templateUrl: './account-security-notifications-card.component.html',
    styleUrl: './account-security-notifications-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSecurityNotificationsCardComponent {
    readonly settings = input<NotificationSettings | null>(null);
    readonly isLoading = input(true);

    private readonly notificationsService = inject(NotificationSettingsService);

    private readonly alerts = inject(TuiNotificationService);

    private readonly savedFormValue =
        signal<SecurityNotificationsFormValue | null>(null);

    protected readonly isSaving = signal(false);

    protected readonly securityNotificationsForm = new FormGroup({
        login: new FormControl(false, {
            nonNullable: true
        }),
        changePassword: new FormControl(false, {
            nonNullable: true
        }),
        sessionsFinished: new FormControl(false, {
            nonNullable: true
        }),
        twoFactorNotifications: new FormControl(false, {
            nonNullable: true
        })
    });

    constructor() {
        effect(() => {
            const settings = this.settings();

            if (!settings) {
                return;
            }

            const formValue = this.getFormValue(settings);

            this.savedFormValue.set(formValue);

            this.securityNotificationsForm.patchValue(formValue, {
                emitEvent: false
            });
        });
    }

    protected updateNotificationSettings() {
        const formValue = this.securityNotificationsForm.getRawValue();

        this.isSaving.set(true);

        this.securityNotificationsForm.disable({
            emitEvent: false
        });

        this.notificationsService
            .updateMyNotificationSettings({
                loginNotificationsEnabled: formValue.login,
                passwordChangedNotificationsEnabled: formValue.changePassword,
                sessionsFinishedNotificationsEnabled:
                    formValue.sessionsFinished,
                twoFactorNotificationsEnabled: formValue.twoFactorNotifications
            })
            .pipe(
                tap(settings => {
                    const savedFormValue = this.getFormValue(settings);

                    this.savedFormValue.set(savedFormValue);

                    this.securityNotificationsForm.patchValue(savedFormValue, {
                        emitEvent: false
                    });

                    this.alerts
                        .open('Настройки успешно обновлены', {
                            appearance: 'positive'
                        })
                        .subscribe();
                }),
                catchError(() => {
                    const savedFormValue = this.savedFormValue();

                    if (savedFormValue) {
                        this.securityNotificationsForm.patchValue(
                            savedFormValue,
                            {
                                emitEvent: false
                            }
                        );
                    }

                    this.alerts
                        .open('Не удалось обновить настройки', {
                            appearance: 'negative'
                        })
                        .subscribe();

                    return EMPTY;
                }),
                finalize(() => {
                    this.isSaving.set(false);

                    this.securityNotificationsForm.enable({
                        emitEvent: false
                    });
                })
            )
            .subscribe();
    }

    private getFormValue(
        settings: NotificationSettings
    ): SecurityNotificationsFormValue {
        return {
            login: settings.loginNotificationsEnabled,
            changePassword: settings.passwordChangedNotificationsEnabled,
            sessionsFinished: settings.sessionsFinishedNotificationsEnabled,
            twoFactorNotifications: settings.twoFactorNotificationsEnabled
        };
    }
}
