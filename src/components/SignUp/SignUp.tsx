import React, { FC, useEffect, useReducer, useRef } from "react";
import style from "./SignUp.module.scss";
import SignUpServer from "../../server/SignUpServer";
import Button from "../Elements/Button";
import ImageSuccess from "./../../images/success-image.svg";
import UserDataForm from "./UserDataForm";
import UserPositionForm from "./UserPositionForm";
import Loader from "./../Elements/Loader";
import UserImage from "./UserImage";
import { nameValidator, emailValidator } from "./FormValidator";
import {
    formatPhoneNumberIntl,
    isValidPhoneNumber,
} from "react-phone-number-input";
import { Action, State } from "./SignUpTypes";

const initialState: State = {
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: "",
    previewPhoto: "",
    isValid: false,
    errorFields: [],
    isSignedUp: false,
    isLoading: false,
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
            const stateChanges: string[] = [];
            for (key in state) {
                switch (key) {
                    case "email": {
                        if (!emailValidator(state[key])) {
                            stateChanges.push(key);
                        }
                        break;
                    }
                    case "name": {
                        if (!nameValidator(state[key])) {
                            stateChanges.push(key);
                        }
                        break;
                    }
                    case "phone": {
                        if (!isValidPhoneNumber(state[key])) {
                            stateChanges.push(key);
                        }
                        break;
                    }
                    default: {
                        if (
                            state[key] === "" ||
                            state[key] === undefined ||
                            state[key] === null
                        ) {
                            stateChanges.push(key);
                        }
                    }
                }
            }
            console.log(stateChanges);
            if (stateChanges.length) {
                return { ...state, errorFields: stateChanges, isValid: false };
            }
            return { ...state, errorFields: [], isValid: true };
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
        dispatch({ type: "checkIsValid" });
    }, [state.photo]);

    function textAndSelectAction(_e?: React.ChangeEvent<HTMLInputElement>) {
        if (_e && "type" in _e?.currentTarget) {
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

    function addNumberAction(_e?: string) {
        if (_e) {
            dispatch({
                type: "field",
                fieldName: "phone",
                payload: formatPhoneNumberIntl(_e).replace(/\s/g, ""),
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

    async function sendData() {
        dispatch({ type: "isLoading", payload: true });
        const res: void | {
            success: boolean;
        } = await SignUpServer(state);
        dispatch({ type: "isLoading", payload: false });
        if (res) {
            dispatch({ type: "setIsSignedUp", payload: res?.success });
        }
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
                                addNumberAction={addNumberAction}
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
