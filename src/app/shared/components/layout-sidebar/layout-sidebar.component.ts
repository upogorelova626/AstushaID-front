import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-layout-sidebar',
    imports: [TuiButton, TuiIcon, RouterLink],
    templateUrl: './layout-sidebar.component.html',
    styleUrl: './layout-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidebarComponent {}
