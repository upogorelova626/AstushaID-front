import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UserSession} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserSessionsService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/users/me/sessions';

    getMySessions(): Observable<UserSession[]> {
        return this.http.get<UserSession[]>(`${this.baseApiUrl}`);
    }

    terminateOtherSessions(): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/others`);
    }

    terminateSession(sessionId: string) {
        return this.http.delete<void>(`${this.baseApiUrl}/${sessionId}`);
    }
}
