import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiBadge, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'app-astusha-services-notification-card',
    imports: [TuiIcon, TuiInput, TuiSwitch, TuiAvatar, TuiBadge],
    templateUrl: './astusha-services-notification-card.component.html',
    styleUrl: './astusha-services-notification-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstushaServicesNotificationCardComponent {}
