import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';

@Component({
    selector: 'app-layout-header',
    imports: [TuiIcon, TuiButton, TuiAvatar],
    templateUrl: './layout-header.component.html',
    styleUrl: './layout-header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent {}
