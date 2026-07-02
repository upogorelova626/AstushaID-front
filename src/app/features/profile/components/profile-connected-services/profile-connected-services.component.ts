import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiIcon} from '@taiga-ui/core';
import {TuiButton} from '@taiga-ui/core';

@Component({
    selector: 'app-profile-connected-services',
    imports: [TuiIcon, TuiButton],
    templateUrl: './profile-connected-services.component.html',
    styleUrl: './profile-connected-services.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileConnectedServicesComponent {
    protected goToAstushaApp() {
        window.location.href = 'http://localhost:4200/dashboard';
    }

    protected goToAstushaBook() {}

    protected goToAstushaChat() {}
}
