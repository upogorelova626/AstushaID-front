import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../features/auth/services/auth.service';

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

    protected logout() {
        this.autnService
            .logout()
            .subscribe(() => this.router.navigate(['/auth/login']));
    }
}
