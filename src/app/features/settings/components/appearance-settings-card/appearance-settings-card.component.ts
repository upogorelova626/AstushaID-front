import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {catchError, EMPTY, finalize, tap} from 'rxjs';

import {UsersService} from '../../../auth/services/users.service';
import {AstushaUser, UserTheme} from '../../../../shared/interfaces';

interface ThemeOption {
    label: string;
    icon: string;
    theme: UserTheme;
}

@Component({
    selector: 'app-appearance-settings-card',
    imports: [TuiButton, TuiIcon],
    templateUrl: './appearance-settings-card.component.html',
    styleUrl: './appearance-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppearanceSettingsCardComponent {
    readonly currentUser = input<AstushaUser | null>(null);
    readonly isLoading = input(false);

    private readonly usersService = inject(UsersService);

    protected readonly changingTheme = signal<UserTheme | null>(null);
    protected readonly selectedTheme = signal<UserTheme | null>(null);

    protected readonly themes: ThemeOption[] = [
        {
            label: 'Светлая',
            icon: '@tui.sun',
            theme: UserTheme.Light
        },
        {
            label: 'Тёмная',
            icon: '@tui.moon',
            theme: UserTheme.Dark
        }
    ];

    constructor() {
        effect(() => {
            const user = this.currentUser();

            if (!user) {
                return;
            }

            this.selectedTheme.set(user.theme);
        });
    }

    protected changeTheme(theme: UserTheme) {
        if (this.selectedTheme() === theme || this.changingTheme()) {
            return;
        }

        this.changingTheme.set(theme);

        this.usersService
            .changeTheme({theme})
            .pipe(
                tap(user => {
                    this.selectedTheme.set(user.theme);
                }),
                catchError(() => EMPTY),
                finalize(() => {
                    this.changingTheme.set(null);
                })
            )
            .subscribe();
    }
}
