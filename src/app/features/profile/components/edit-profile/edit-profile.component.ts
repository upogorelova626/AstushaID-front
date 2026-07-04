import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TuiError, TuiIcon, TuiInput, TuiTextfield} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {AstushaUser} from '../../../../shared/interfaces/user.interface';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-edit-profile',
    imports: [
        TuiTextfield,
        TuiInput,
        TuiError,
        TuiSkeleton,
        TuiIcon,
        TuiAvatar,
        DatePipe
    ],
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent {
    readonly user = input<AstushaUser | null>(null);
    readonly isLoading = input(false);
}
