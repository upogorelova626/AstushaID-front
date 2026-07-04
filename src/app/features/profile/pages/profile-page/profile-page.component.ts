import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {EditProfileComponent} from '../../components/edit-profile/edit-profile.component';
import {ProfileSecurityBannerComponent} from '../../components/profile-security-banner/profile-security-banner.component';
import {ProfileConnectedServicesComponent} from '../../components/profile-connected-services/profile-connected-services.component';
import {ProfileQuickActionsComponent} from '../../components/profile-quick-actions/profile-quick-actions.component';
import {UsersService} from '../../../auth/services/users.service';
import {AstushaUser} from '../../../../shared/interfaces/user.interface';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-profile-page',
    imports: [
        EditProfileComponent,
        ProfileSecurityBannerComponent,
        ProfileConnectedServicesComponent,
        ProfileQuickActionsComponent
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
    private readonly usersService = inject(UsersService);

    protected readonly me = signal<AstushaUser | null>(null);
    protected readonly isLoading = signal(false);

    ngOnInit() {
        this.isLoading.set(true);
        this.usersService
            .getMe()
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe(user => {
                this.me.set(user);
            });
    }
}
