import React, { useEffect, useState } from "react";
import style from "./SignUp.module.scss";
import PhoneInput from "react-phone-number-input/input";
import ua from "react-phone-number-input/locale/ua.json";
import { State } from "./SignUpTypes";

const UserDataForm: React.FC<{
    textAndSelectAction: (_e?: React.ChangeEvent<HTMLInputElement>) => void;
    state: State;
    addNumberAction: (_e?: string) => void;
}> = ({ state, textAndSelectAction, addNumberAction }) => {
    const [isError, setIsError] = useState<Array<string>>([
        ...state.errorFields,
    ]);

    const [isSelected, setIsSelected] = useState<Array<string>>([]);

    useEffect(() => {
        setIsError([...state.errorFields]);
    }, [state.errorFields]);

    function selected(_e: any) {
        if (!isSelected.includes(_e.target?.id)) {
            setIsSelected((prev) => [...prev, _e.target?.id]);
        }
    }

    return (
        <div className={style.wrapper__form}>
            <input
                id="name"
                className={
                    isError.includes("name") && isSelected.includes("name")
                        ? style.error__colour__input +
                          " " +
                          style.wrapper__form__name
                        : style.wrapper__form__name
                }
                type="text"
                onSelect={(e) => selected(e)}
                placeholder="Your name"
                onChange={(e) => textAndSelectAction(e)}
            />
            <label
                className={
                    isError.includes("name") && isSelected.includes("name")
                        ? style.error__colour__label
                        : ""
                }
                htmlFor="name"
            >
                name
            </label>
            <input
                id="email"
                className={
                    isError.includes("email") && isSelected.includes("email")
                        ? style.error__colour__input +
                          " " +
                          style.wrapper__form__email
                        : style.wrapper__form__email
                }
                type="email"
                placeholder="Email"
                onSelect={(e) => selected(e)}
                onChange={(e) => textAndSelectAction(e)}
            />
            <label
                className={
                    isError.includes("email") && isSelected.includes("email")
                        ? style.error__colour__label
                        : ""
                }
                htmlFor="email"
            >
                email
            </label>
            <PhoneInput
                country="UA"
                id="phone"
                className={
                    isError.includes("phone") && isSelected.includes("phone")
                        ? style.error__colour__input +
                          " " +
                          style.wrapper__form__phone
                        : style.wrapper__form__phone
                }
                type="tel"
                placeholder="Phone"
                onSelect={(e: any) => selected(e)}
                label={ua}
                value={state.phone}
                onChange={(e) => addNumberAction(e)}
            />
            <label
                className={
                    isError.includes("phone") && isSelected.includes("phone")
                        ? style.error__colour__label
                        : ""
                }
                htmlFor="phone"
            >
                +38 (XXX) XXX - XX - XX
            </label>
        </div>
    );
};

export default UserDataForm;
