import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import {TuiIcon, TuiInput, TuiNotificationService} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch, TuiSkeleton} from '@taiga-ui/kit';
import {NotificationSettings} from '../../../../shared/interfaces';
import {NotificationSettingsService} from '../../../../shared/services/notification-settings.service';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {catchError, EMPTY, finalize, tap} from 'rxjs';

@Component({
    selector: 'app-marketing-emails-card',
    imports: [
        TuiAvatar,
        TuiInput,
        TuiSwitch,
        TuiIcon,
        ReactiveFormsModule,
        TuiSkeleton
    ],
    templateUrl: './marketing-emails-card.component.html',
    styleUrl: './marketing-emails-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingEmailsCardComponent {
    readonly settings = input<NotificationSettings | null>(null);
    readonly isLoading = input(true);

    private readonly notificationsService = inject(NotificationSettingsService);
    private readonly alerts = inject(TuiNotificationService);

    protected readonly isSaving = signal(false);
    private readonly savedValue = signal(false);

    protected readonly control = new FormControl(false, {nonNullable: true});

    constructor() {
        effect(() => {
            const settings = this.settings();

            if (!settings) {
                return;
            }

            this.savedValue.set(settings.marketingEmailsEnabled);

            this.control.setValue(settings.marketingEmailsEnabled, {
                emitEvent: false
            });
        });
    }

    protected updateNotificationSettings() {
        this.isSaving.set(true);
        const payload = {marketingEmailsEnabled: this.control.getRawValue()};
        this.control.disable({emitEvent: false});
        const previousValue = this.settings()?.marketingEmailsEnabled ?? false;

        this.notificationsService
            .updateMyNotificationSettings(payload)
            .pipe(
                tap(settings => {
                    this.savedValue.set(settings.marketingEmailsEnabled);

                    this.control.setValue(settings.marketingEmailsEnabled, {
                        emitEvent: false
                    });

                    this.alerts
                        .open('Настройки успешно обновлены', {
                            appearance: 'positive'
                        })
                        .subscribe();
                }),
                catchError(() => {
                    this.control.setValue(previousValue, {
                        emitEvent: false
                    });
                    this.alerts
                        .open('Не удалось обновить настройки', {
                            appearance: 'negative'
                        })
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
