export function nameValidator(name: string) {
    return !/\d/.test(name);
}

export function emailValidator(email: string) {
    return /[@]/.test(email);
}

export function phoneValidator(phone: string) {
    return (/^\+38\s?\(\d{3}\)-\d{3}-\d{2}-\d{2}/g).test(phone);
}