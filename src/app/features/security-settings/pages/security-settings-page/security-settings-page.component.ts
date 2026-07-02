import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChangePasswordCardComponent} from '../../components/change-password-card/change-password-card.component';
import {ActiveSessionsCardComponent} from '../../components/active-sessions-card/active-sessions-card.component';
import {RecentActivityCardComponent} from '../../components/recent-activity-card/recent-activity-card.component';
import {TwoFactorAuthCardComponent} from '../../components/two-factor-auth-card/two-factor-auth-card.component';
import {AccountDeleteCardComponent} from '../../components/account-delete-card/account-delete-card.component';

@Component({
    selector: 'app-security-settings-page',
    imports: [
        ChangePasswordCardComponent,
        ActiveSessionsCardComponent,
        RecentActivityCardComponent,
        TwoFactorAuthCardComponent,
        AccountDeleteCardComponent
    ],
    templateUrl: './security-settings-page.component.html',
    styleUrl: './security-settings-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySettingsPageComponent {}
