import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiDialogService, TuiIcon} from '@taiga-ui/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../features/auth/services/auth.service';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {HelpDaialogComponent} from '../help-daialog/help-daialog.component';

@Component({
    selector: 'app-layout-sidebar',
    imports: [TuiButton, TuiIcon, RouterLink],
    templateUrl: './layout-sidebar.component.html',
    styleUrl: './layout-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidebarComponent {
    private readonly autnService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly dialogs = inject(TuiDialogService);

    protected logout() {
        this.autnService
            .logout()
            .subscribe(() => this.router.navigate(['/auth/login']));
    }

    protected openHelpDialog() {
        this.dialogs
            .open<void>(new PolymorpheusComponent(HelpDaialogComponent), {
                size: 's'
            })

            .subscribe();
    }
}
