import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TuiButton} from '@taiga-ui/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-error-page',
    imports: [TuiButton],
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent {
    private readonly router = inject(Router);
    private readonly location = inject(Location);

    protected goBack() {
        this.location.back();
    }

    protected goToMain() {
        this.router.navigate(['/account/profile']);
    }
}
