export const VALIDATION_ERRORS = {
    required: 'Поле обязательно для заполнения',

    email: 'Введите корректный email',

    minlength: ({requiredLength}: {requiredLength: number}) =>
        `Минимальная длина — ${requiredLength} символов`,

    maxlength: ({requiredLength}: {requiredLength: number}) =>
        `Максимальная длина — ${requiredLength} символов`,

    pattern: 'Значение не соответствует необходимому формату',

    passwordMismatch: 'Пароли не совпадают',

    samePassword: 'Новый пароль не должен совпадать со старым',

    newPasswordMismatch: 'Новые пароли не совпадают',

    serverError: (message: string) => message
};
