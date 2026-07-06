import {Component} from '@angular/core';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'app-notification-frequency-card',
    imports: [TuiAvatar, TuiIcon, TuiInput, TuiSwitch],
    templateUrl: './notification-frequency-card.component.html',
    styleUrl: './notification-frequency-card.component.less'
})
export class NotificationFrequencyCardComponent {}
