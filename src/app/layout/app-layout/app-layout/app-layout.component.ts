import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-app-layout',
    imports: [],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {}
