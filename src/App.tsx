import React, { FC, useEffect } from "react";
import style from "./App.module.scss";
import Head from "./components/Head/Head";
import Promo from "./components/Promo/Promo";
import Users from "./components/Users/Users";
import SignUp from "./components/SignUp/SignUp";
import getToken from "./server/GetToken";
const App: FC<{}> = () => {
    useEffect(() => {
        getToken();
    });
    return (
        <div className={style.wrapper}>
            <Head />
            <Promo />
            <Users />
            <SignUp />
        </div>
    );
};

export default App;
