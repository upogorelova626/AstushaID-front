import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';

interface ActiveSession {
    id: string;
    icon: string;
    title: string;
    meta: string;
    isCurrent: boolean;
}

@Component({
    selector: 'app-active-sessions-card',
    imports: [TuiAvatar, TuiButton],
    templateUrl: './active-sessions-card.component.html',
    styleUrl: './active-sessions-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveSessionsCardComponent {
    protected readonly sessions: ActiveSession[] = [
        {
            id: 'current',
            icon: '@tui.monitor',
            title: 'Windows · Chrome',
            meta: 'Москва, Россия · 12 июн. 2025, 10:42',
            isCurrent: true
        },
        {
            id: 'iphone',
            icon: '@tui.smartphone',
            title: 'iPhone · Safari',
            meta: 'Санкт-Петербург, Россия · 10 июн. 2025, 18:21',
            isCurrent: false
        },
        {
            id: 'macos',
            icon: '@tui.laptop',
            title: 'macOS · Safari',
            meta: 'Казань, Россия · 8 июн. 2025, 22:15',
            isCurrent: false
        }
    ];

    protected terminateSession(session: ActiveSession) {}

    protected terminateOtherSessions() {}
}
