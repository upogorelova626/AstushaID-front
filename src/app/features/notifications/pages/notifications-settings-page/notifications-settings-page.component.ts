import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MarketingEmailsCardComponent} from '../../components/notification-frequency-card/marketing-emails-card.component';
import {AstushaServicesNotificationCardComponent} from '../../components/astusha-services-notification-card/astusha-services-notification-card.component';
import {AccountSecurityNotificationsCardComponent} from '../../components/account-security-notifications-card/account-security-notifications-card.component';
import {NotificationChannelsCardComponent} from '../../components/notification-channels-card/notification-channels-card.component';

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
export class NotificationsSettingsPageComponent {}
