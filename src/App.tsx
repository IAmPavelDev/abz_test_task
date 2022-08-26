import React, { FC, useEffect, useState } from "react";
import style from "./App.module.scss";
import Head from "./components/Head/Head";
import Promo from "./components/Promo/Promo";
import Users from "./components/Users/Users";
import SignUp from "./components/SignUp/SignUp";
import getToken from "./server/GetToken";

const App: FC<{}> = () => {
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

    const scrollToRefs: { [key: string]: any } = {};
    const getReference = (ref: { name: string; ref: any }) => {
        scrollToRefs[ref.name] = ref.ref;
    };

    useEffect(() => {
        getToken();
    });
    return (
        <div className={style.wrapper}>
            <Head isSignedUp={isSignedUp} refs={scrollToRefs} />
            <Promo isSignedUp={isSignedUp} refs={scrollToRefs} />
            <Users isSignedUp={isSignedUp} reference={getReference} />
            <SignUp
                isSignedUp={isSignedUp}
                setIsSignedUp={setIsSignedUp}
                reference={getReference}
            />
        </div>
    );
};

export default App;
