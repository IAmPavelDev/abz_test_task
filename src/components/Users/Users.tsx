import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import style from "./Users.module.scss";
import User from "./UserBadge/User";
import { userProps } from "./UserBadge/User";
import Loader from "../Elements/Loader";
import { GetUsers } from "../../server/GetUsers";
import Button from "../Elements/Button";

const Users: FC<{}> = () => {
    const [usersList, setUsersList] = useState<ReactElement[]>([]);
    const [isLoader, setIsLoader] = useState(true);
    const loadedPages = useRef(0);
    const neededPage = useRef(1);
    const maxPossiblePages = useRef(1);
    const actionWidth = () => {
        return window.innerWidth > 900
            ? "desktop"
            : window.innerWidth <= 900 && window.innerWidth >= 650
            ? "tablet"
            : "mobile";
    };

    const [widthAdaptive, setWidthAdaptive] = useState(actionWidth());

    useEffect(() => {
        (async function () {
            getListOfUsers(neededPage.current);
        })();
        window.addEventListener("resize", () => {
            setWidthAdaptive(actionWidth);
        });
    });

    async function getListOfUsers(argu: Number) {
        if (
            neededPage.current > loadedPages.current &&
            neededPage.current <= maxPossiblePages.current
        ) {
            const data = await GetUsers(argu);
            const buffer: JSX.Element[] = [];
            data.users.forEach((dataObject: userProps) => {
                buffer.push(
                    <div key={dataObject.id} className={style.wrapper__users__user}>
                        <User
                            name={dataObject.name}
                            phone={dataObject.phone}
                            position={dataObject.position}
                            email={dataObject.email}
                            photo={dataObject.photo}
                            key={dataObject.id}
                            id={dataObject.id}
                        />
                    </div>
                );
            });
            setUsersList([...usersList, ...buffer]);
            loadedPages.current = neededPage.current;
            maxPossiblePages.current = data.total_pages;
            setIsLoader(false);
        }
    }

    return (
        <div className={style.wrapper}>
            <p>Working with GET request</p>
            {isLoader ? (
                <Loader />
            ) : (
                <div
                    className={
                        widthAdaptive === "desktop"
                            ? style.wrapper__users
                            : widthAdaptive === "tablet"
                            ? style.wrapper__users +
                              " " +
                              style.wrapper__users__tablet
                            : style.wrapper__users +
                              " " +
                              style.wrapper__users__mobile
                    }
                >
                    {usersList}
                </div>
            )}
            <Button
                className={style.wrapper__btn}
                onClick={() => {
                    if (neededPage.current < maxPossiblePages.current) {
                        neededPage.current = neededPage.current + 1;
                        getListOfUsers(neededPage.current);
                    }
                }}
            >
                Get more
            </Button>
        </div>
    );
};

export default Users;
