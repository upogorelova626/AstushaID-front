import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'app-account-security-notifications-card',
    imports: [TuiIcon, TuiInput, TuiSwitch, TuiAvatar],
    templateUrl: './account-security-notifications-card.component.html',
    styleUrl: './account-security-notifications-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSecurityNotificationsCardComponent {}
