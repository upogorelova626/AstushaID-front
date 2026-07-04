import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    AuthResponse,
    CreateAccountPayload,
    LoginPayload
} from '../../../shared/interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/auth';

    createAccount(payload: CreateAccountPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.baseApiUrl}/create-account`,
            payload
        );
    }

    login(payload: LoginPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.baseApiUrl}/login`,
            payload
        );
    }

    refresh(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseApiUrl}/refresh`, null);
    }

    logout(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseApiUrl}/logout`, null);
    }
}
