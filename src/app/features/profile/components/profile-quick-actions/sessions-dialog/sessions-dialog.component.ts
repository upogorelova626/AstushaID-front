import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal
} from '@angular/core';
import {UserSessionsService} from '../../../../../shared/services/user-sessions.service';
import {UserSession} from '../../../../../shared/interfaces';
import {catchError, EMPTY, finalize} from 'rxjs';
import {TuiButton, type TuiDialogContext} from '@taiga-ui/core';
import {TuiAvatar, TuiSkeleton} from '@taiga-ui/kit';
import {DatePipe} from '@angular/common';
import {injectContext} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'app-sessions-dialog',
    imports: [TuiButton, TuiAvatar, TuiSkeleton, DatePipe],
    templateUrl: './sessions-dialog.component.html',
    styleUrl: './sessions-dialog.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsDialogComponent {
    protected readonly context = injectContext<TuiDialogContext<void, void>>();

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
