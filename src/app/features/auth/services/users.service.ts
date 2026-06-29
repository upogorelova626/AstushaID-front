import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {AstushaUser} from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl = 'http://localhost:3000/users';

    getMe() {
        return this.http.get<AstushaUser>(`${this.baseApiUrl}/me`);
    }
}
