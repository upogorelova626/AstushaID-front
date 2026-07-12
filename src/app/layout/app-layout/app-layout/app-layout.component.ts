import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutHeaderComponent} from '../../../shared/components/layout-header/layout-header.component';
import {LayoutSidebarComponent} from '../../../shared/components/layout-sidebar/layout-sidebar.component';

@Component({
    selector: 'app-app-layout',
    imports: [LayoutSidebarComponent, LayoutHeaderComponent, RouterOutlet],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {}
