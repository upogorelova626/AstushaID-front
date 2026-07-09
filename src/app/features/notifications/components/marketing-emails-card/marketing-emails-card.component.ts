import {Component, input} from '@angular/core';
import {TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';
import {NotificationSettings} from '../../../../shared/interfaces';

@Component({
    selector: 'marketing-emails-card',
    imports: [TuiAvatar, TuiInput, TuiSwitch, TuiIcon],
    templateUrl: './marketing-emails-card.component.html',
    styleUrl: './marketing-emails-card.component.less'
})
export class MarketingEmailsCardComponent {
    readonly settings = input<NotificationSettings | null>(null);
    readonly isLoading = input();
}
