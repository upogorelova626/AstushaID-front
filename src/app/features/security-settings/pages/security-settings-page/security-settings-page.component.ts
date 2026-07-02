import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChangePasswordCardComponent} from '../../components/change-password-card/change-password-card.component';

@Component({
    selector: 'app-security-settings-page',
    imports: [ChangePasswordCardComponent],
    templateUrl: './security-settings-page.component.html',
    styleUrl: './security-settings-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySettingsPageComponent {}
