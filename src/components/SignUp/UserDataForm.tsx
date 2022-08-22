import React from "react";
import style from "./SignUp.module.scss";
const UserDataForm: React.FC<{ textAndSelectAction: any }> = ({ textAndSelectAction }) => {
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
                onChange={(e) => textAndSelectAction(e)}
            />
            <label htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
        </div>
    );
};

export default UserDataForm;
