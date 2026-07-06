import {DatePipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    signal
} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {catchError, EMPTY, finalize} from 'rxjs';
import {UserSession} from '../../../../shared/interfaces';
import {UserSessionsService} from '../../../../shared/services/user-sessions.service';

@Component({
    selector: 'app-active-sessions-card',
    imports: [TuiAvatar, TuiButton, TuiSkeleton, DatePipe],
    templateUrl: './active-sessions-card.component.html',
    styleUrl: './active-sessions-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveSessionsCardComponent implements OnInit {
    private readonly userSessionsService = inject(UserSessionsService);

    protected readonly sessions = signal<UserSession[]>([]);
    protected readonly isLoading = signal(false);
    protected readonly terminatingSessionId = signal<string | null>(null);
    protected readonly isTerminatingOtherSessions = signal(false);

    protected readonly hasOtherSessions = computed(() =>
        this.sessions().some(session => !session.isCurrent)
    );

    ngOnInit() {
        this.isLoading.set(true);

        this.userSessionsService
            .getMySessions()
            .pipe(
                catchError(() => EMPTY),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe(sessions => {
                this.sessions.set(sessions);
            });
    }

    protected terminateSession(sessionId: string) {
        this.terminatingSessionId.set(sessionId);

        this.userSessionsService
            .terminateSession(sessionId)
            .pipe(
                catchError(() => EMPTY),
                finalize(() => this.terminatingSessionId.set(null))
            )
            .subscribe(() => {
                this.sessions.update(sessions =>
                    sessions.filter(session => session.id !== sessionId)
                );
            });
    }

    protected terminateOtherSessions() {
        this.isTerminatingOtherSessions.set(true);

        this.userSessionsService
            .terminateOtherSessions()
            .pipe(
                catchError(() => EMPTY),
                finalize(() => this.isTerminatingOtherSessions.set(false))
            )
            .subscribe(() => {
                this.sessions.update(sessions =>
                    sessions.filter(session => session.isCurrent)
                );
            });
    }
}
