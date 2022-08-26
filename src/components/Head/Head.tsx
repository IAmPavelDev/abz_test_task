import { FC } from "react";
import style from "./Head.module.scss";
import logo from "./../../images/logo.svg";
import Button from "../Elements/Button";
const Head: FC<{ isSignedUp: boolean, refs: any }> = ({isSignedUp, refs }) => {
    function scrollToSignForm() {
        refs.signComponent.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    function scrollToUsersForm() {
        console.log(refs);
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
                    {isSignedUp ? "" : <Button onClick={scrollToSignForm}>Sign up</Button>}
                </div>
            </div>
        </div>
    );
};

export default Head;
