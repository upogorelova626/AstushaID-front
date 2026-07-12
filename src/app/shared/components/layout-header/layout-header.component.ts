import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal
} from '@angular/core';
import {TuiButton, TuiHint, TuiIcon} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {UsersService} from '../../../features/auth/services/users.service';
import {tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-layout-header',
    imports: [TuiIcon, TuiButton, TuiAvatar, TuiSkeleton, TuiHint, AsyncPipe],
    templateUrl: './layout-header.component.html',
    styleUrl: './layout-header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent {
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
