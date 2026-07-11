import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal
} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {catchError, EMPTY, finalize} from 'rxjs';
import {UsersService} from '../../../auth/services/users.service';
import {UserTheme} from '../../../../shared/interfaces';
import {TuiAvatar} from '@taiga-ui/kit';
import {toSignal} from '@angular/core/rxjs-interop';

interface ThemeOption {
    label: string;
    icon: string;
    theme: UserTheme;
}

@Component({
    selector: 'app-appearance-settings-card',
    imports: [TuiButton, TuiAvatar],
    templateUrl: './appearance-settings-card.component.html',
    styleUrl: './appearance-settings-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppearanceSettingsCardComponent {
    private readonly usersService = inject(UsersService);

    protected readonly currentUser = toSignal(this.usersService.currentUser$);

    protected readonly changingTheme = signal<UserTheme | null>(null);

    protected readonly selectedTheme = computed(
        () => this.currentUser()?.theme ?? null
    );

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

    protected changeTheme(theme: UserTheme) {
        if (this.selectedTheme() === theme || this.changingTheme()) {
            return;
        }

        this.changingTheme.set(theme);

        this.usersService
            .changeTheme({theme})
            .pipe(
                catchError(() => EMPTY),
                finalize(() => {
                    this.changingTheme.set(null);
                })
            )
            .subscribe();
    }
}
