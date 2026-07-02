import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiTable, TuiTableControl} from '@taiga-ui/addon-table';

@Component({
    selector: 'app-recent-activity-card',
    imports: [TuiAvatar, TuiButton, TuiTable],
    templateUrl: './recent-activity-card.component.html',
    styleUrl: './recent-activity-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityCardComponent {}
