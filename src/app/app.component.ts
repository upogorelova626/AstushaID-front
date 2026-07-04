import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {UsersService} from './features/auth/services/users.service';
import {UserTheme} from './shared/interfaces';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TuiRoot],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
    title = 'astusha-id';

    private readonly usersService = inject(UsersService);

    protected readonly userTheme = signal<UserTheme | null>(null);

    ngOnInit(): void {
        this.usersService.getMe().subscribe(me => this.userTheme.set(me.theme));
    }
}
