import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiList} from '@taiga-ui/layout';

@Component({
    selector: 'app-account-delete-card',
    imports: [TuiAvatar, TuiButton, TuiList],
    templateUrl: './account-delete-card.component.html',
    styleUrl: './account-delete-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDeleteCardComponent {}
