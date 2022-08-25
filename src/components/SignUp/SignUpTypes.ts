
export interface State {
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: string | Blob;
    previewPhoto: string;
    isValid: boolean;
    errorFields: Array<string>;
    isSignedUp: boolean;
    isLoading: boolean;
}

export type Action =
    | { type: "checkIsValid" }
    | { type: "setIsSignedUp"; payload: boolean }
    | { type: "isLoading"; payload: boolean }
    | { type: "field"; fieldName: string; payload: string | Blob };
