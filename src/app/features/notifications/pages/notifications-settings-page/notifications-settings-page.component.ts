import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {MarketingEmailsCardComponent} from '../../components/marketing-emails-card/marketing-emails-card.component';
import {AstushaServicesNotificationCardComponent} from '../../components/astusha-services-notification-card/astusha-services-notification-card.component';
import {AccountSecurityNotificationsCardComponent} from '../../components/account-security-notifications-card/account-security-notifications-card.component';
import {NotificationChannelsCardComponent} from '../../components/notification-channels-card/notification-channels-card.component';
import {NotificationSettingsService} from '../../../../shared/services/notification-settings.service';
import {NotificationSettings} from '../../../../shared/interfaces';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-notifications-settings-page',
    imports: [
        AstushaServicesNotificationCardComponent,
        AccountSecurityNotificationsCardComponent,
        NotificationChannelsCardComponent,
        MarketingEmailsCardComponent
    ],
    templateUrl: './notifications-settings-page.component.html',
    styleUrl: './notifications-settings-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsSettingsPageComponent implements OnInit {
    private readonly notificationsService = inject(NotificationSettingsService);

    protected readonly isLoading = signal(false);
    protected readonly notificationSettings =
        signal<NotificationSettings | null>(null);

    ngOnInit(): void {
        this.isLoading.set(true);
        this.notificationsService
            .getMyNotificationSettings()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe(settings => this.notificationSettings.set(settings));
    }
}
