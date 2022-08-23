import React from "react";
import style from "./SignUp.module.scss";
import { State } from "./SignUp";

const UserDataForm: React.FC<{ state: State; textAndSelectAction: any }> = ({
    state,
    textAndSelectAction,
}) => {
    return (
        <div className={style.wrapper__form}>
            <input
                id="name"
                className={style.wrapper__form__name}
                type="text"
                placeholder="Your name"
                onChange={(e) => textAndSelectAction(e)}
            />
            <input
                id="email"
                className={style.wrapper__form__email}
                type="email"
                placeholder="Email"
                onChange={(e) => textAndSelectAction(e)}
            />
            <input
                id="phone"
                className={style.wrapper__form__Phone}
                type="tel"
                placeholder="Phone"
                value={state.phone}
                onChange={(e) => textAndSelectAction(e)}
            />
            <label htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
        </div>
    );
};

export default UserDataForm;
