import {Component} from '@angular/core';
import {TuiIcon, TuiTextfield, TuiButton, TuiLink} from '@taiga-ui/core';
import {TuiInputPin} from '@taiga-ui/kit';
import {ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
    selector: 'app-two-factor-page',
    imports: [
        TuiIcon,
        TuiTextfield,
        TuiInputPin,
        TuiButton,
        TuiLink,
        ReactiveFormsModule
    ],
    templateUrl: './two-factor-page.component.html',
    styleUrl: './two-factor-page.component.less'
})
export class TwoFactorPageComponent {
    protected readonly code = new FormControl('');
}
