import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Injector,
    OnInit,
    signal
} from '@angular/core';
import {TuiButton, TuiDialogService} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {TuiTable} from '@taiga-ui/addon-table';
import {UserActivityService} from '../../../../shared/services/user-activity.service';
import {UserActivity} from '../../../../shared/interfaces';
import {catchError, EMPTY, finalize} from 'rxjs';
import {DatePipe} from '@angular/common';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {AllActivitiesComponent} from './all-activities/all-activities.component';

@Component({
    selector: 'app-recent-activity-card',
    imports: [TuiAvatar, TuiButton, TuiTable, DatePipe, TuiSkeleton],
    templateUrl: './recent-activity-card.component.html',
    styleUrl: './recent-activity-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityCardComponent implements OnInit {
    private readonly userActivityService = inject(UserActivityService);
    private readonly dialogs = inject(TuiDialogService);
    private readonly injector = inject(Injector);

    protected readonly userActivities = signal<UserActivity[]>([]);
    protected readonly isLoading = signal(false);

    ngOnInit(): void {
        this.isLoading.set(true);
        this.userActivityService
            .getUserActivity()
            .pipe(
                catchError(() => EMPTY),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe(activities => this.userActivities.set(activities));
    }

    protected readonly previewActions = computed(() => {
        return this.userActivities().slice(0, 3);
    });

    protected showAllActions() {
        this.dialogs
            .open<void>(
                new PolymorpheusComponent(
                    AllActivitiesComponent,
                    this.injector
                ),
                {
                    label: 'Недавняя активность',
                    size: 'm',
                    data: this.userActivities()
                }
            )
            .subscribe();
    }
}
