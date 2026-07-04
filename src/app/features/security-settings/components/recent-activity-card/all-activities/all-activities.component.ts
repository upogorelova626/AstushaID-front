import {ChangeDetectionStrategy, Component} from '@angular/core';
import {injectContext} from '@taiga-ui/polymorpheus';
import {type TuiDialogContext} from '@taiga-ui/core';
import {TuiTable} from '@taiga-ui/addon-table';
import {UserActivity} from '../../../../../shared/interfaces';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-all-activities',
    imports: [TuiTable, DatePipe],
    templateUrl: './all-activities.component.html',
    styleUrl: './all-activities.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllActivitiesComponent {
    protected readonly context =
        injectContext<TuiDialogContext<void, UserActivity[]>>();
    protected actions = this.context.data;
}
