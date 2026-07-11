import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {ProfileSettingsCardComponent} from '../../components/profile-settings-card/profile-settings-card.component';
import {UsersService} from '../../../auth/services/users.service';
import {AstushaUser} from '../../../../shared/interfaces';
import {finalize} from 'rxjs';
import {EmailSettingsCardComponent} from '../../components/email-settings-card/email-settings-card.component';
import {AppearanceSettingsCardComponent} from '../../components/appearance-settings-card/appearance-settings-card.component';

@Component({
    selector: 'app-settings-page',
    imports: [
        ProfileSettingsCardComponent,
        EmailSettingsCardComponent,
        AppearanceSettingsCardComponent
    ],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {}
