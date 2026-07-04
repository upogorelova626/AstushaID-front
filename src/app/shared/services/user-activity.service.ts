import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {UserActivity} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserActivityService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3002/users/me/activity';

    getUserActivity() {
        return this.http.get<UserActivity[]>(`${this.baseApiUrl}`);
    }
}
