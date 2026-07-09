import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {
    NotificationSettings,
    UpdateNotificationSettingsRequest
} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationSettingsService {
    private readonly http = inject(HttpClient);

    private readonly baseApiUrl =
        'http://localhost:3002/users/me/notification-settings';

    getMyNotificationSettings(): Observable<NotificationSettings> {
        return this.http.get<NotificationSettings>(`${this.baseApiUrl}`);
    }

    updateMyNotificationSettings(
        payload: UpdateNotificationSettingsRequest
    ): Observable<NotificationSettings> {
        return this.http.patch<NotificationSettings>(
            `${this.baseApiUrl}`,
            payload
        );
    }
}
