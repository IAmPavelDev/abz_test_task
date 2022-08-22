import React, { FC, useEffect } from "react";
import style from "./App.module.scss";
import Head from "./components/Head/Head";
import Promo from "./components/Promo/Promo";
import Users from "./components/Users/Users";
import SignUp from "./components/SignUp/SignUp";
import getToken from "./server/GetToken";

const App: FC<{}> = () => {
    const scrollToRefs: { [key: string]: any } = {};
    const getReference = (ref: { name: string; ref: any }) => {
        scrollToRefs[ref.name] = ref.ref;
    };
    useEffect(() => {
        getToken();
    });
    return (
        <div className={style.wrapper}>
            <Head refs={scrollToRefs} />
            <Promo refs={scrollToRefs} />
            <Users reference={getReference} />
            <SignUp reference={getReference} />
        </div>
    );
};

export default App;
