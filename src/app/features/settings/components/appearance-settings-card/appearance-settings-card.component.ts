import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
    selector: 'app-appearance-settings-card',
    imports: [TuiButton, TuiIcon],
    templateUrl: './appearance-settings-card.component.html',
    styleUrl: './appearance-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppearanceSettingsCardComponent {}
