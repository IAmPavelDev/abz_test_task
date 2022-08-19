import React, { FC } from "react";
import style from "./Promo.module.scss";
import backPromo from "./../../images/pexels-alexandr-podvalny-1227513.jpeg";
import Button from "../Elements/Button";

const Promo: FC<{}> = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper__img}></div>
            <img src={backPromo} alt="" />
            <div className={style.wrapper__cover}>
                <p>Test assignment for front-end developer</p>
                <p>
                    What defines a good front-end developer is one that has
                    skilled knowledge of HTML, CSS, JS with a vast understanding
                    of User design thinking as they'll be building web
                    interfaces with accessibility in mind. They should also be
                    excited to learn, as the world of Front-End Development
                    keeps evolving.
                </p>
                <Button>Sign up</Button>
            </div>
        </div>
    );
};

export default Promo;
