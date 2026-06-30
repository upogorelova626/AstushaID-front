import {AbstractControl, ValidatorFn} from '@angular/forms';

function addControlError(control: AbstractControl | null, errorKey: string) {
    if (!control || control.errors?.[errorKey]) {
        return;
    }

    control.setErrors({
        ...(control.errors ?? {}),
        [errorKey]: true
    });
}

function removeControlError(control: AbstractControl | null, errorKey: string) {
    if (!control?.errors?.[errorKey]) {
        return;
    }

    const errors = {...control.errors};

    delete errors[errorKey];

    control.setErrors(Object.keys(errors).length ? errors : null);
}

export function samePasswordValidator(
    currentPasswordControlName = 'currentPassword',
    newPasswordControlName = 'newPassword'
): ValidatorFn {
    return (control: AbstractControl) => {
        const currentPasswordControl = control.get(currentPasswordControlName);
        const newPasswordControl = control.get(newPasswordControlName);

        const currentPassword = currentPasswordControl?.value;
        const newPassword = newPasswordControl?.value;

        if (!currentPassword || !newPassword) {
            removeControlError(newPasswordControl, 'samePassword');

            return null;
        }

        if (currentPassword === newPassword) {
            addControlError(newPasswordControl, 'samePassword');
        } else {
            removeControlError(newPasswordControl, 'samePassword');
        }

        return null;
    };
}
