import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
    selector: 'app-layout-sidebar',
    imports: [TuiButton, TuiIcon],
    templateUrl: './layout-sidebar.component.html',
    styleUrl: './layout-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidebarComponent {}
