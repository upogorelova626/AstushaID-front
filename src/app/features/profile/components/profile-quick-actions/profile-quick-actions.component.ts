import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector
} from '@angular/core';
import {TuiButton, TuiDialogService, TuiIcon} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {DeleteProfileNotificationDialogComponent} from './delete-profile-notification-dialog/delete-profile-notification-dialog.component';

@Component({
    selector: 'app-profile-quick-actions',
    imports: [TuiButton, TuiIcon],
    templateUrl: './profile-quick-actions.component.html',
    styleUrl: './profile-quick-actions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileQuickActionsComponent {
    private readonly dialogs = inject(TuiDialogService);
    private readonly injector = inject(Injector);

    protected openDeleteProfileNotificationDialog() {
        this.dialogs
            .open(
                new PolymorpheusComponent(
                    DeleteProfileNotificationDialogComponent,
                    this.injector
                ),
                {
                    size: 's'
                }
            )
            .subscribe();
    }
}
