import React, { FC } from "react";
import style from "./Head.module.scss";
import logo from "./../../images/logo.svg";
import Button from "../Elements/Button";
const Head: FC<{}> = () => {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <img
                    className={style.wrapper__logo}
                    src={logo}
                    alt="logotype"
                />
                <div className={style.wrapper__buttons}>
                    <Button>Users</Button>
                    <Button>Sign up</Button>
                </div>
            </div>
        </div>
    );
};

export default Head;
