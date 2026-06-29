import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
    selector: 'app-profile-security-banner',
    imports: [TuiButton, TuiIcon],
    templateUrl: './profile-security-banner.component.html',
    styleUrl: './profile-security-banner.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSecurityBannerComponent {}
