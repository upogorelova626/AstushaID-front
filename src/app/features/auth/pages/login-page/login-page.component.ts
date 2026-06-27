import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    TuiButton,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiTextfield
} from '@taiga-ui/core';

@Component({
    selector: 'app-login-page',
    imports: [TuiTextfield, TuiInput, TuiIcon, TuiButton, TuiLink],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {}
