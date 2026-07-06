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
import {AstushaUser} from '../../interfaces';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-layout-header',
    imports: [TuiIcon, TuiButton, TuiAvatar, TuiSkeleton],
    templateUrl: './layout-header.component.html',
    styleUrl: './layout-header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent implements OnInit {
    private readonly usersService = inject(UsersService);

    protected readonly isLoading = signal(false);
    protected readonly currentUser = signal<AstushaUser | null>(null);

    ngOnInit(): void {
        this.isLoading.set(true);
        this.usersService
            .getMe()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe(me => this.currentUser.set(me));
    }
}
