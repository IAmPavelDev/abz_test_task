import { FC } from "react";
import style from "./Head.module.scss";
import logo from "./../../images/logo.svg";
import Button from "../Elements/Button";
const Head: FC<{ refs: any }> = ({ refs }) => {
    function scrollToSignForm() {
        refs.signComponent.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    function scrollToUsersForm() {
        refs.usersComponent.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <img
                    className={style.wrapper__logo}
                    src={logo}
                    alt="logotype"
                />
                <div className={style.wrapper__buttons}>
                    <Button onClick={scrollToUsersForm}>Users</Button>
                    <Button onClick={scrollToSignForm}>Sign up</Button>
                </div>
            </div>
        </div>
    );
};

export default Head;
