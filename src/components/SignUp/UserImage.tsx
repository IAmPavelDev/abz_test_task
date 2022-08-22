import React, { FC, useRef } from "react";
import style from "./SignUp.module.scss";
const UserImage: FC<{ state: any; photoAddAction: any }> = ({
    state,
    photoAddAction,
}) => {
    const inputField = useRef<HTMLInputElement>(null);
    return (
        <div
            className={
                state.previewPhoto
                    ? style.wrapper__photo__preview + " " + style.wrapper__photo
                    : style.wrapper__photo
            }
        >
            <div className={style.wrapper__photo__btn}>
                <label htmlFor="inputPhoto">
                    {state.previewPhoto ? "Change" : "Upload"}
                </label>
                <input
                    id="inputPhoto"
                    type="file"
                    ref={inputField}
                    onInput={(e) => {
                        photoAddAction(e);
                    }}
                />
            </div>

            <div
                onDragStart={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => photoAddAction(e)}
                className={style.wrapper__photo__drag}
            >
                {state.previewPhoto ? (
                    <>
                        <div
                            onClick={() => {
                                if (inputField.current?.value) {
                                    inputField.current.value = "";
                                }
                                photoAddAction();
                            }}
                            className={style.wrapper__photo__drag__mask}
                        >
                            Remove
                        </div>
                        <img alt="preview" src={state.previewPhoto} />
                    </>
                ) : (
                    <>Upload your photo</>
                )}
            </div>
        </div>
    );
};

export default UserImage;
