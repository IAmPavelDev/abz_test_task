import React, { FC, useEffect, useRef, useState } from "react";
import style from "./SignUp.module.scss";
import SignUpServer from "../../server/SignUpServer";
import Button from "../Elements/Button";
import ImageSuccess from "./../../images/success-image.svg";

const SignUp: FC<{ reference: any }> = ({ reference }) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [isValid, setIsValid] = useState<boolean | undefined>(false);
    const [signedUp, setSignedUp] = useState<boolean>(false);
    const signComponentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        reference({ ref: signComponentRef, name: "signComponent" });
    });

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const buffer: { [key: string]: string | File } = useRef({
        name: "",
        email: "",
        phone: "",
        position: "",
        photo: "",
    }).current;

    function localSyncData(_e?: React.ChangeEvent<HTMLInputElement>) {
        if (_e) {
            if (_e.currentTarget.type === "radio") {
                buffer[_e.currentTarget.name] = _e.currentTarget.value;
            } else {
                _e.preventDefault();
                buffer[_e.currentTarget.id] = _e.currentTarget.value;
            }
        }
        setIsValid(true);
        for (let key in buffer) {
            if (buffer[key] === "") {
                setIsValid(false);
            }
        }
    }

    function sendData() {
        const result = SignUpServer(buffer);
        result.then((result) => setSignedUp(result?.success || false));
    }

    function onDropHandler(_e: React.DragEvent<HTMLDivElement>) {
        _e.preventDefault();
        const files = _e.dataTransfer.files;
        buffer["photo"] = files[0];
        setSelectedFile(files[0]);
    }

    return (
        <div ref={signComponentRef} className={style.wrapper}>
            {signedUp ? (
                <>
                    <p>User successfully registered</p>
                    <img
                        className={style.wrapper__success}
                        src={ImageSuccess}
                        alt="success"
                    />
                </>
            ) : (
                <>
                    <p>Working with POST request</p>
                    <div className={style.wrapper__form}>
                        <input
                            id="name"
                            className={style.wrapper__form__name}
                            type="text"
                            placeholder="Your name"
                            onChange={(e) => localSyncData(e)}
                        />
                        <input
                            id="email"
                            className={style.wrapper__form__email}
                            type="email"
                            placeholder="Email"
                            onChange={(e) => localSyncData(e)}
                        />
                        <input
                            id="phone"
                            className={style.wrapper__form__Phone}
                            type="tel"
                            placeholder="Phone"
                            onChange={(e) => localSyncData(e)}
                        />
                        <label htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
                    </div>
                    <div className={style.wrapper__select}>
                        <p>Select your position</p>
                        <div>
                            <input
                                type="radio"
                                value="Frontend developer"
                                name="position"
                                id="FD"
                                onChange={(e) => localSyncData(e)}
                            />
                            <label htmlFor="FD">Frontend developer</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="Backend developer"
                                name="position"
                                id="BD"
                                onChange={(e) => localSyncData(e)}
                            />
                            <label htmlFor="BD">Backend developer</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="Designer"
                                name="position"
                                id="Des"
                                onChange={(e) => localSyncData(e)}
                            />
                            <label htmlFor="Des">Designer</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="QA"
                                name="position"
                                id="QA"
                                onChange={(e) => localSyncData(e)}
                            />
                            <label htmlFor="QA">QA</label>
                        </div>
                    </div>
                    <div
                        className={
                            preview
                                ? style.wrapper__photo__preview +
                                  " " +
                                  style.wrapper__photo
                                : style.wrapper__photo
                        }
                    >
                        <div className={style.wrapper__photo__btn}>
                            <label htmlFor="inputPhoto">
                                {preview ? "Change" : "Upload"}
                            </label>
                            <input
                                id="inputPhoto"
                                type="file"
                                onInput={(e) => {
                                    e.preventDefault();
                                    if (e.currentTarget.files) {
                                        buffer["photo"] =
                                            e.currentTarget.files[0];
                                        setSelectedFile(
                                            e.currentTarget.files[0]
                                        );
                                    }
                                }}
                                onChange={(e) => localSyncData(e)}
                            />
                        </div>

                        <div
                            onDragStart={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => onDropHandler(e)}
                            className={style.wrapper__photo__drag}
                            onChange={() => localSyncData()}
                        >
                            {preview ? (
                                <>
                                    <div
                                        onClick={() => {
                                            buffer["photo"] = "";
                                            setPreview("");
                                            setSelectedFile(undefined);
                                            localSyncData();
                                        }}
                                        className={
                                            style.wrapper__photo__drag__mask
                                        }
                                    >
                                        Remove
                                    </div>
                                    <img alt="preview" src={preview} />
                                </>
                            ) : (
                                <>Upload your photo</>
                            )}
                        </div>
                    </div>
                    <Button
                        className={style.wrapper__send}
                        disabled={!isValid}
                        onClick={() => {
                            if (isValid) sendData();
                        }}
                    >
                        Sign Up
                    </Button>
                </>
            )}
        </div>
    );
};

export default SignUp;
