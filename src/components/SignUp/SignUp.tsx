import React, { FC, useEffect, useReducer, useRef } from "react";
import style from "./SignUp.module.scss";
import SignUpServer from "../../server/SignUpServer";
import Button from "../Elements/Button";
import ImageSuccess from "./../../images/success-image.svg";
import UserDataForm from "./UserDataForm";
import UserPositionForm from "./UserPositionForm";
import Loader from "./../Elements/Loader";
import UserImage from "./UserImage";
import { phoneValidator, nameValidator, emailValidator } from "./FormValidator";

const initialState: State = {
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: "",
    previewPhoto: "",
    isValid: false,
    isSignedUp: false,
    isLoading: false,
};

export interface State {
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: string | Blob;
    previewPhoto: string;
    isValid: boolean;
    isSignedUp: boolean;
    isLoading: boolean;
}

type Action =
    | { type: "checkIsValid" }
    | { type: "setIsSignedUp"; payload: boolean }
    | { type: "isLoading"; payload: boolean }
    | { type: "field"; fieldName: string; payload: string | Blob };

function formReducer(state: State, action: Action) {
    switch (action.type) {
        case "field": {
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        }
        case "checkIsValid": {
            let key: keyof typeof state;
            for (key in state) {
                switch (key) {
                    case "phone": {
                        if (!phoneValidator(state[key])) {
                            if (state[key].substring(0, 3) === "380") {
                                return {
                                    ...state,
                                    phone: `+${state[key].substring(0, 2)}(
                                        ${state[key].substring(2, 5)})-
                                        ${state[key].substring(5, 8)}-
                                        ${state[key].substring(8, 10)}-
                                        ${state[key].substring(10, 12)}
                                    `,
                                    isValid: false,
                                };
                            }
                            return { ...state, isValid: false };
                        }
                        break;
                    }
                    case "email": {
                        if (!emailValidator(state[key])) {
                            return { ...state, isValid: false };
                        }
                        break;
                    }
                    case "name": {
                        if (!nameValidator(state[key])) {
                            return { ...state, isValid: false };
                        }
                        break;
                    }
                }
            }
            return { ...state, isValid: true };
        }
        case "setIsSignedUp": {
            return { ...state, setIsSignedUp: action.payload };
        }
        case "isLoading": {
            return { ...state, isLoading: action.payload };
        }
        default:
            return state;
    }
}

const SignUp: FC<{ reference: any }> = ({ reference }) => {
    const signComponentRef = useRef<HTMLDivElement>(null);
    const [state, dispatch] = useReducer(formReducer, initialState);

    useEffect(() => {
        reference({ ref: signComponentRef, name: "signComponent" });
    });

    useEffect(() => {
        if (state.photo) {
            if (typeof state.photo !== "string") {
                const objectUrl = URL.createObjectURL(state.photo);
                dispatch({
                    type: "field",
                    fieldName: "previewPhoto",
                    payload: objectUrl,
                });
            }
        }
        if (state.photo === "") {
            dispatch({
                type: "field",
                fieldName: "previewPhoto",
                payload: "",
            });
        }
    }, [state.photo]);

    function textAndSelectAction(_e?: React.ChangeEvent<HTMLInputElement>) {
        if (_e && "type" in _e.currentTarget) {
            dispatch({
                type: "field",
                fieldName:
                    _e.currentTarget[
                        _e.currentTarget.type === "radio" ? "name" : "id"
                    ],
                payload: _e.currentTarget.value,
            });
        }
        dispatch({ type: "checkIsValid" });
    }

    function photoAddAction(
        _e?: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>
    ) {
        if (!_e) {
            dispatch({
                type: "field",
                fieldName: "photo",
                payload: "",
            });
        }
        if (_e && "dataTransfer" in _e && _e.dataTransfer.files[0]) {
            const files = _e.dataTransfer.files;
            dispatch({
                type: "field",
                fieldName: "photo",
                payload: files[0],
            });
        }
        if (_e && "target" in _e) {
            const target = _e.target as HTMLInputElement;
            if (target?.files) {
                dispatch({
                    type: "field",
                    fieldName: "photo",
                    payload: target?.files[0],
                });
            }
        }
        dispatch({ type: "checkIsValid" });
    }

    function sendData() {
        const result = SignUpServer(state);
        dispatch({ type: "isLoading", payload: true });
        result
            .then((result) => {
                dispatch({
                    type: "setIsSignedUp",
                    payload: result?.success || false,
                });
            })
            .then(() => {
                dispatch({ type: "isLoading", payload: false });
            });
    }

    return (
        <div ref={signComponentRef} className={style.wrapper}>
            {state.isLoading ? (
                <Loader />
            ) : (
                <>
                    {state.isSignedUp ? (
                        <>
                            <p>User successfully registered</p>
                            <img
                                className={style.wrapper__success}
                                src={ImageSuccess}
                                alt="success"
                            />
                        </>
                    ) : (
                        <>
                            <p>Working with POST request</p>
                            <UserDataForm
                                state={state}
                                textAndSelectAction={textAndSelectAction}
                            />
                            <UserPositionForm
                                textAndSelectAction={textAndSelectAction}
                            />
                            <UserImage
                                state={state}
                                photoAddAction={photoAddAction}
                            />
                            <Button
                                className={style.wrapper__send}
                                disabled={!state.isValid}
                                onClick={() => {
                                    if (state.isValid) sendData();
                                }}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SignUp;
