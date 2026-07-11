import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiIcon, TuiInput, TuiLabel, TuiTextfield} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {UsersService} from '../../../auth/services/users.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-email-settings-card',
    imports: [TuiAvatar, TuiIcon, TuiInput, TuiTextfield, TuiLabel],
    templateUrl: './email-settings-card.component.html',
    styleUrl: './email-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSettingsCardComponent {
    private readonly usersService = inject(UsersService);

    protected readonly currentUser = toSignal(this.usersService.currentUser$);
}
