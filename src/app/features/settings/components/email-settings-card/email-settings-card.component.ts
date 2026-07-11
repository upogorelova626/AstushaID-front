import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TuiIcon, TuiInput, TuiLabel, TuiTextfield} from '@taiga-ui/core';
import {AstushaUser} from '../../../../shared/interfaces';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';

@Component({
    selector: 'app-email-settings-card',
    imports: [
        TuiAvatar,
        TuiIcon,
        TuiInput,
        TuiTextfield,
        TuiLabel,
        TuiSkeleton
    ],
    templateUrl: './email-settings-card.component.html',
    styleUrl: './email-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSettingsCardComponent {
    readonly currentUser = input<AstushaUser | null>(null);
    readonly isLoading = input(false);
}
