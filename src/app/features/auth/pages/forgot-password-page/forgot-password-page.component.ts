import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiInput, TuiLink, TuiTextfield} from '@taiga-ui/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-forgot-password-page',
    imports: [TuiTextfield, TuiInput, TuiButton, TuiLink, RouterLink],
    templateUrl: './forgot-password-page.component.html',
    styleUrl: './forgot-password-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPageComponent {}
