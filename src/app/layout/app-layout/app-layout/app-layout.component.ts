import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UsersService} from '../../../features/auth/services/users.service';
import {LayoutHeaderComponent} from '../../../shared/components/layout-header/layout-header.component';
import {LayoutSidebarComponent} from '../../../shared/components/layout-sidebar/layout-sidebar.component';

@Component({
    selector: 'app-app-layout',
    imports: [LayoutSidebarComponent, LayoutHeaderComponent, RouterOutlet],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {
    private readonly usersService = inject(UsersService);

    constructor() {
        this.usersService.loadCurrentUser().subscribe();
    }
}
