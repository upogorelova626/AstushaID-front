import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {
    EditProfilePayload,
    AstushaUser,
    ChangePasswordPayload,
    DeleteAccountPayload
} from '../../../shared/interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/users';

    getMe(): Observable<AstushaUser> {
        return this.http.get<AstushaUser>(`${this.baseApiUrl}/me`);
    }

    editProfile(payload: EditProfilePayload): Observable<AstushaUser> {
        return this.http.patch<AstushaUser>(`${this.baseApiUrl}/me`, payload);
    }

    editPassword(payload: ChangePasswordPayload): Observable<void> {
        return this.http.patch<void>(`${this.baseApiUrl}/me/password`, payload);
    }

    deleteAccount(payload: DeleteAccountPayload): Observable<void> {
        return this.http.delete<void>(`${this.baseApiUrl}/me`, {body: payload});
    }
}
