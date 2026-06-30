import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ApplicationsCardComponent} from '../../components/applications-card/applications-card.component';

@Component({
    selector: 'app-application-page',
    imports: [ApplicationsCardComponent],
    templateUrl: './application-page.component.html',
    styleUrl: './application-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationPageComponent {}
