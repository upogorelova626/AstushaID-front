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

interface ChannelsFormValue {
    emailNotifications: boolean;
    pushNotifications: boolean;
    telegramNotifications: boolean;
}

@Component({
    selector: 'app-notification-channels-card',
    imports: [TuiIcon, TuiSwitch, TuiAvatar, ReactiveFormsModule, TuiSkeleton],
    templateUrl: './notification-channels-card.component.html',
    styleUrl: './notification-channels-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationChannelsCardComponent {
    readonly settings = input<NotificationSettings | null>(null);
    readonly isLoading = input(true);

    private readonly notificationsService = inject(NotificationSettingsService);

    private readonly alerts = inject(TuiNotificationService);

    private readonly savedFormValue = signal<ChannelsFormValue | null>(null);

    protected readonly isSaving = signal(false);

    protected readonly channelsForm = new FormGroup({
        emailNotifications: new FormControl(false, {
            nonNullable: true
        }),
        pushNotifications: new FormControl(
            {
                value: false,
                disabled: true
            },
            {
                nonNullable: true
            }
        ),
        telegramNotifications: new FormControl(
            {
                value: false,
                disabled: true
            },
            {
                nonNullable: true
            }
        )
    });

    constructor() {
        effect(() => {
            const settings = this.settings();

            if (!settings) {
                return;
            }

            const formValue = this.getFormValue(settings);

            this.savedFormValue.set(formValue);

            this.channelsForm.patchValue(formValue, {
                emitEvent: false
            });
        });
    }

    protected updateNotificationSettings() {
        const formValue = this.channelsForm.getRawValue();

        this.isSaving.set(true);

        this.channelsForm.controls.emailNotifications.disable({
            emitEvent: false
        });

        this.notificationsService
            .updateMyNotificationSettings({
                emailNotificationsEnabled: formValue.emailNotifications,
                pushNotificationsEnabled: formValue.pushNotifications,
                telegramNotificationsEnabled: formValue.telegramNotifications
            })
            .pipe(
                tap(settings => {
                    const savedFormValue = this.getFormValue(settings);

                    this.savedFormValue.set(savedFormValue);

                    this.channelsForm.patchValue(savedFormValue, {
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
                        this.channelsForm.patchValue(savedFormValue, {
                            emitEvent: false
                        });
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

                    this.channelsForm.controls.emailNotifications.enable({
                        emitEvent: false
                    });
                })
            )
            .subscribe();
    }

    private getFormValue(settings: NotificationSettings): ChannelsFormValue {
        return {
            emailNotifications: settings.emailNotificationsEnabled,
            pushNotifications: settings.pushNotificationsEnabled,
            telegramNotifications: settings.telegramNotificationsEnabled
        };
    }
}
