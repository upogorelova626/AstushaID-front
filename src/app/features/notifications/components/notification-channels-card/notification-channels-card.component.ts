import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'app-notification-channels-card',
    imports: [TuiIcon, TuiSwitch, TuiAvatar, TuiInput],
    templateUrl: './notification-channels-card.component.html',
    styleUrl: './notification-channels-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationChannelsCardComponent {}
