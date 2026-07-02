import {Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

type ApplicationStatus = 'active' | 'connected' | 'current' | 'soon';

interface Application {
    icon: string;
    name: string;
    description: string;
    status: ApplicationStatus;
    statusLabel: string;
    actionLabel: string;
    url?: string;
    disabled?: boolean;
}

@Component({
    selector: 'app-applications-card',
    imports: [TuiButton, TuiIcon],
    templateUrl: './applications-card.component.html',
    styleUrl: './applications-card.component.less'
})
export class ApplicationsCardComponent {
    protected readonly applications: Application[] = [
        {
            icon: '@tui.layout-grid',
            name: 'Astusha App',
            description: 'Проекты, задачи и команды',
            status: 'active',
            statusLabel: 'Активно',
            actionLabel: 'Открыть',
            url: 'http://localhost:4200/dashboard'
        },
        {
            icon: '@tui.book-open-text',
            name: 'Astusha Book',
            description: 'Хэндбуки и база знаний',
            status: 'connected',
            statusLabel: 'Подключено',
            actionLabel: 'Открыть',
            url: 'http://localhost:4201'
        },
        {
            icon: '@tui.shield',
            name: 'Astusha ID',
            description: 'Единый аккаунт и управление профилем',
            status: 'current',
            statusLabel: 'Текущее приложение',
            actionLabel: 'Открыто',
            disabled: true
        },
        {
            icon: '@tui.message-square-heart',
            name: 'Astusha Messenger',
            description: 'Корпоративный мессенджер от Астюши',
            status: 'soon',
            statusLabel: 'Скоро',
            actionLabel: 'Скоро',
            disabled: true
        },
        {
            icon: '@tui.notebook-pen',
            name: 'Astusha Notes',
            description: 'Личные заметки и быстрые записи',
            status: 'soon',
            statusLabel: 'Скоро',
            actionLabel: 'Скоро',
            disabled: true
        }
    ];

    protected openApplication(application: Application) {
        if (application.disabled || !application.url) {
            return;
        }

        window.location.assign(application.url);
    }
}
