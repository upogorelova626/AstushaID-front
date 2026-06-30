import {Component} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
    selector: 'app-applications-card',
    imports: [TuiButton, TuiIcon],
    templateUrl: './applications-card.component.html',
    styleUrl: './applications-card.component.less'
})
export class ApplicationsCardComponent {
    protected readonly applications = [
        {
            icon: '@tui.layout-grid',
            name: 'Astusha App',
            description: 'Проекты, задачи и команды',
            status: 'active',
            statusLabel: 'Активно'
        },
        {
            icon: '@tui.book-open-text',
            name: 'Astusha Book',
            description: 'Хэндбуки и база знаний',
            status: 'connected',
            statusLabel: 'Подключено'
        },
        {
            icon: '@tui.shield',
            name: 'Astusha ID',
            description: 'Единый аккаунт и управление профилем',
            status: 'current',
            statusLabel: 'Текущее приложение'
        },
        {
            icon: '@tui.message-square-heart',
            name: 'Astusha Messenger',
            description: 'Корпоративный мессенджер от Астюши',
            status: 'soon',
            statusLabel: 'Скоро'
        },
        {
            icon: '@tui.notebook-pen',
            name: 'Astusha Notes',
            description: 'Личные заметки и быстрые записи',
            status: 'soon',
            statusLabel: 'Скоро'
        }
    ];
}
