import {Component} from '@angular/core';
import {TuiButton, type TuiDialogContext} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {injectContext} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'app-help-daialog',
    imports: [TuiButton, TuiAvatar],
    templateUrl: './help-daialog.component.html',
    styleUrl: './help-daialog.component.less'
})
export class HelpDaialogComponent {
    protected readonly context = injectContext<TuiDialogContext<void, void>>();
}
