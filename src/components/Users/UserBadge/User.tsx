import React, { Key } from "react";
import style from "./User.module.scss";
import cover from "./../../../images/photo-cover.svg";
import Tooltip from "../../Elements/Tooltip";

export type userProps = {
    id: Key | null | undefined;
    name: string;
    phone: string;
    position: string;
    email: string;
    photo: string;
};

const User = (props: userProps) => {
    return (
        <div key={props.id} className={style.wrapper}>
            <img
                className={style.wrapper__photo}
                src={props.photo}
                alt="user profile"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${cover}`;
                }}
            />
            <div className={style.wrapper__name}>
                <Tooltip>{props.name}</Tooltip>
            </div>
            <div className={style.wrapper__position}>
                <Tooltip>{props.position}</Tooltip>
            </div>
            <div className={style.wrapper__email}>
                <Tooltip>{props.email}</Tooltip>
            </div>
            <div className={style.wrapper__phone}>
                <Tooltip>{props.phone}</Tooltip>
            </div>
        </div>
    );
};

export default User;
