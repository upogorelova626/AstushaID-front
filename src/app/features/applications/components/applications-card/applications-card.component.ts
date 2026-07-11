import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiBadge} from '@taiga-ui/kit';

interface Application {
    icon: string;
    name: string;
    description: string;
    statusLabel: string;
    appearance: string;
    url?: string;
    disabled?: boolean;
}

@Component({
    selector: 'app-applications-card',
    imports: [TuiButton, TuiIcon, TuiBadge],
    templateUrl: './applications-card.component.html',
    styleUrl: './applications-card.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsCardComponent {
    protected readonly applications: Application[] = [
        {
            icon: '@tui.layout-grid',
            name: 'Astusha App',
            description: 'Проекты, задачи и команды',
            statusLabel: 'Активно',
            appearance: 'positive',
            url: 'http://localhost:4200/dashboard'
        },
        {
            icon: '@tui.book-open-text',
            name: 'Astusha Book',
            description: 'Хэндбуки и база знаний',
            statusLabel: 'Активно',
            appearance: 'positive',
            url: 'http://localhost:4201'
        },
        {
            icon: '@tui.shield',
            name: 'Astusha ID',
            description: 'Единый аккаунт и управление профилем',
            statusLabel: 'Текущее приложение',
            appearance: 'primary',
            disabled: true
        },
        {
            icon: '@tui.message-square-heart',
            name: 'Astusha Messenger',
            description: 'Корпоративный мессенджер от Астюши',
            statusLabel: 'Скоро',
            appearance: 'neutral',
            disabled: true
        },
        {
            icon: '@tui.notebook-pen',
            name: 'Astusha Notes',
            description: 'Личные заметки и быстрые записи',
            statusLabel: 'Скоро',
            appearance: 'neutral',
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
