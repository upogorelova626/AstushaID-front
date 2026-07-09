import {Component} from '@angular/core';
import {TuiInput} from '@taiga-ui/core';
import {TuiAvatar, TuiSwitch} from '@taiga-ui/kit';

@Component({
    selector: 'marketing-emails-frequency-card',
    imports: [TuiAvatar, TuiInput, TuiSwitch],
    templateUrl: './marketing-emails-card.component.html',
    styleUrl: './marketing-emails-card.component.less'
})
export class MarketingEmailsCardComponent {}
