import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector
} from '@angular/core';
import {
    TuiButton,
    TuiDialogService,
    TuiNotificationService
} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiList} from '@taiga-ui/layout';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {DeleteProfileNotificationDialogComponent} from '../../../profile/components/profile-quick-actions/delete-profile-notification-dialog/delete-profile-notification-dialog.component';
import {switchMap} from 'rxjs';

@Component({
    selector: 'app-account-delete-card',
    imports: [TuiAvatar, TuiButton, TuiList],
    templateUrl: './account-delete-card.component.html',
    styleUrl: './account-delete-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDeleteCardComponent {
    private readonly alerts = inject(TuiNotificationService);
    private readonly dialogs = inject(TuiDialogService);
    private readonly injector = inject(Injector);

    protected openDeleteProfileNotificationDialog() {
        this.dialogs
            .open<boolean>(
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
