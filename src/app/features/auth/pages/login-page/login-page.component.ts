import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    TuiButton,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiTextfield
} from '@taiga-ui/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-login-page',
    imports: [TuiTextfield, TuiInput, TuiButton, TuiLink, RouterLink],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {}
