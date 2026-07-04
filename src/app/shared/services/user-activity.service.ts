import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UserActivity} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserActivityService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/users/me/activity';

    getUserActivity(): Observable<UserActivity[]> {
        return this.http.get<UserActivity[]>(`${this.baseApiUrl}`);
    }
}
