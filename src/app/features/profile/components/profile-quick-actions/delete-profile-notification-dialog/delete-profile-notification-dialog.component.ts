import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector
} from '@angular/core';
import {
    TuiButton,
    TuiDialogService,
    TuiIcon,
    type TuiDialogContext
} from '@taiga-ui/core';
import {injectContext} from '@taiga-ui/polymorpheus';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {DeleteProfileDialogComponent} from '../delete-profile-dialog/delete-profile-dialog.component';

@Component({
    selector: 'app-delete-profile-notification-dialog',
    imports: [TuiButton, TuiIcon],
    templateUrl: './delete-profile-notification-dialog.component.html',
    styleUrl: './delete-profile-notification-dialog.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProfileNotificationDialogComponent {
    protected readonly context =
        injectContext<TuiDialogContext<boolean, void>>();

    private readonly dialogs = inject(TuiDialogService);
    private readonly injector = inject(Injector);

    protected openDeleteProfileDialog() {
        this.dialogs
            .open<string>(
                new PolymorpheusComponent(
                    DeleteProfileDialogComponent,
                    this.injector
                ),
                {
                    size: 's'
                }
            )
            .subscribe();
    }
}
