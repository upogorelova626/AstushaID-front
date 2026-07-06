import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {
    EditProfilePayload,
    AstushaUser,
    ChangePasswordPayload,
    DeleteAccountPayload,
    ChangeThemePayload
} from '../../../shared/interfaces';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/users';

    private readonly currentUserSubject =
        new BehaviorSubject<AstushaUser | null>(null);

    readonly currentUser = this.currentUserSubject.asObservable();

    getMe(): Observable<AstushaUser> {
        return this.http.get<AstushaUser>(`${this.baseApiUrl}/me`);
    }

    loadCurrentUser(): Observable<AstushaUser> {
        return this.getMe().pipe(
            tap(user => this.currentUserSubject.next(user))
        );
    }

    setCurrentUser(user: AstushaUser) {
        this.currentUserSubject.next(user);
    }

    clearCurrentUser() {
        this.currentUserSubject.next(null);
    }

    editProfile(payload: EditProfilePayload): Observable<AstushaUser> {
        return this.http
            .patch<AstushaUser>(`${this.baseApiUrl}/me`, payload)
            .pipe(tap(user => this.currentUserSubject.next(user)));
    }

    editPassword(payload: ChangePasswordPayload): Observable<void> {
        return this.http.patch<void>(`${this.baseApiUrl}/me/password`, payload);
    }

    deleteAccount(payload: DeleteAccountPayload): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/me`, {body: payload});
    }

    changeTheme(payload: ChangeThemePayload): Observable<AstushaUser> {
        return this.http
            .patch<AstushaUser>(`${this.baseApiUrl}/me/theme`, payload)
            .pipe(tap(user => this.currentUserSubject.next(user)));
    }

    uploadAvatar(file: File): Observable<AstushaUser> {
        const formData = new FormData();

        formData.append('avatar', file);

        return this.http
            .patch<AstushaUser>(`${this.baseApiUrl}/me/avatar`, formData)
            .pipe(tap(user => this.currentUserSubject.next(user)));
    }

    deleteAvatar(): Observable<AstushaUser> {
        return this.http
            .delete<AstushaUser>(`${this.baseApiUrl}/me/avatar`)
            .pipe(tap(user => this.currentUserSubject.next(user)));
    }

    changeEmailTwoFactor(payload: {enabled: boolean}): Observable<AstushaUser> {
        return this.http
            .patch<AstushaUser>(
                `${this.baseApiUrl}/me/two-factor/email`,
                payload
            )
            .pipe(tap(user => this.currentUserSubject.next(user)));
    }
}
