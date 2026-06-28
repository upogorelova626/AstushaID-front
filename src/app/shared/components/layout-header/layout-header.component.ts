import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-layout-header',
    imports: [],
    templateUrl: './layout-header.component.html',
    styleUrl: './layout-header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent {}
