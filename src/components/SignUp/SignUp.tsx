import React, { FC, useEffect, useReducer, useRef } from "react";
import style from "./SignUp.module.scss";
import SignUpServer from "../../server/SignUpServer";
import Button from "../Elements/Button";
import ImageSuccess from "./../../images/success-image.svg";
import UserDataForm from "./UserDataForm";
import UserPositionForm from "./UserPositionForm";
import Loader from "./../Elements/Loader";
import UserImage from "./UserImage";

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

interface State {
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

const lightRegexpForPhone: RegExp = new RegExp(/^\+?3?8?\s?\(?(\d+)\)?-?\d{3}-?\d{2}-?\d{2}/g);

const Validator: (data: string | boolean | Blob, type: string) => boolean = (
    data: string | boolean | Blob,
    type: string
) => {
    if (typeof data === "string") {
        if (type === "phone") {
            console.log(data);
            const result = lightRegexpForPhone.test(data);
            console.log(result);
            return !result;
        }
        if (type === "email") {
            return /[@]/.test(data);
        }
        if (type === "name") {
            return !/\d/.test(data);
        }
    }
    return true;
};

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
                if (
                    state[key] === "" ||
                    state[key] === undefined ||
                    !Validator(state[key], key)
                ) {
                    return { ...state, isValid: false };
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
