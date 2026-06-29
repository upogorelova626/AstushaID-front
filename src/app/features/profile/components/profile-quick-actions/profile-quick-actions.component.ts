import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiAccordionDirective} from '@taiga-ui/kit';

@Component({
    selector: 'app-profile-quick-actions',
    imports: [TuiButton, TuiIcon, TuiAccordionDirective],
    templateUrl: './profile-quick-actions.component.html',
    styleUrl: './profile-quick-actions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileQuickActionsComponent {}
