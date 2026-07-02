import {Component, signal} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'app-two-factor-auth-card',
    imports: [TuiAvatar, TuiButton, TuiIcon, TuiSwitch],
    templateUrl: './two-factor-auth-card.component.html',
    styleUrl: './two-factor-auth-card.component.less'
})
export class TwoFactorAuthCardComponent {
    protected readonly isTwoFactorEnabled = signal(true);

    protected toggleTwoFactor() {}

    protected setupAuthenticatorApp() {}

    protected showBackupCodes() {}
}
