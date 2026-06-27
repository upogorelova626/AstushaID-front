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
    selector: 'app-create-account-page',
    imports: [TuiButton, TuiInput, TuiLink, TuiTextfield, RouterLink],
    templateUrl: './create-account-page.component.html',
    styleUrl: './create-account-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountPageComponent {}
