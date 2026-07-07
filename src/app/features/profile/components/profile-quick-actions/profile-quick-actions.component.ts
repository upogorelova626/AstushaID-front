import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector
} from '@angular/core';
import {Router} from '@angular/router';
import {
    TuiButton,
    TuiDialogService,
    TuiIcon,
    TuiNotificationService
} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {catchError, EMPTY, filter, switchMap, tap, timer} from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service';
import {ChangePasswordDialogComponent} from './change-password-dialog/change-password-dialog.component';
import {DeleteProfileNotificationDialogComponent} from './delete-profile-notification-dialog/delete-profile-notification-dialog.component';
import {TwoFactorDialogComponent} from './two-factor-dialog/two-factor-dialog.component';
import {SessionsDialogComponent} from './sessions-dialog/sessions-dialog.component';

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
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiNotificationService);

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

    protected openChangePasswordDialog() {
        this.dialogs
            .open<boolean>(
                new PolymorpheusComponent(
                    ChangePasswordDialogComponent,
                    this.injector
                ),
                {
                    size: 's'
                }
            )
            .pipe(
                filter(Boolean),
                switchMap(() => timer(2000)),
                switchMap(() => this.authService.logout()),
                tap(() => {
                    void this.router.navigate(['/auth/login']);
                }),
                switchMap(() =>
                    this.alerts.open('Войдите в аккаунт заново', {
                        label: 'Пароль успешно изменён',
                        appearance: 'positive'
                    })
                ),
                catchError(() => EMPTY)
            )
            .subscribe();
    }

    protected openTwoFactorAuthDialog() {
        this.dialogs
            .open<void>(
                new PolymorpheusComponent(
                    TwoFactorDialogComponent,
                    this.injector
                ),
                {
                    size: 's'
                }
            )
            .subscribe();
    }

    protected openSessionDialog() {
        this.dialogs
            .open<void>(
                new PolymorpheusComponent(
                    SessionsDialogComponent,
                    this.injector
                ),
                {
                    size: 'm'
                }
            )
            .subscribe();
    }
}
