import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TuiError, TuiIcon, TuiInput, TuiTextfield} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {tap} from 'rxjs';

import {UsersService} from '../../../auth/services/users.service';

@Component({
    selector: 'app-edit-profile',
    imports: [
        TuiTextfield,
        TuiInput,
        TuiError,
        TuiIcon,
        TuiAvatar,
        TuiSkeleton,
        DatePipe,
        AsyncPipe
    ],
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent {
    private readonly usersService = inject(UsersService);

    protected readonly isLoading = signal(true);

    protected readonly currentUser$ = this.usersService.currentUser$.pipe(
        tap(user => {
            if (user) {
                this.isLoading.set(false);
            }
        })
    );
}
