import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {UsersService} from '../../../features/auth/services/users.service';
import {finalize} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-layout-header',
    imports: [TuiIcon, TuiButton, TuiAvatar, TuiSkeleton, AsyncPipe],
    templateUrl: './layout-header.component.html',
    styleUrl: './layout-header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent implements OnInit {
    private readonly usersService = inject(UsersService);
    protected readonly currentUser$ = this.usersService.currentUser;

    protected readonly isLoading = signal(false);

    ngOnInit(): void {
        this.isLoading.set(true);
        this.usersService
            .loadCurrentUser()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
