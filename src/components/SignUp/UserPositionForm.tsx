import React from "react";
import style from "./SignUp.module.scss";
const UserPositionForm: React.FC<{
    textAndSelectAction: (_e?: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ textAndSelectAction }) => {
    return (
        <div className={style.wrapper__select}>
            <p>Select your position</p>
            <div>
                <input
                    type="radio"
                    value="Frontend developer"
                    name="position"
                    id="FD"
                    onChange={(e) => textAndSelectAction(e)}
                />
                <label htmlFor="FD">Frontend developer</label>
            </div>

            <div>
                <input
                    type="radio"
                    value="Backend developer"
                    name="position"
                    id="BD"
                    onChange={(e) => textAndSelectAction(e)}
                />
                <label htmlFor="BD">Backend developer</label>
            </div>

            <div>
                <input
                    type="radio"
                    value="Designer"
                    name="position"
                    id="Des"
                    onChange={(e) => textAndSelectAction(e)}
                />
                <label htmlFor="Des">Designer</label>
            </div>

            <div>
                <input
                    type="radio"
                    value="QA"
                    name="position"
                    id="QA"
                    onChange={(e) => textAndSelectAction(e)}
                />
                <label htmlFor="QA">QA</label>
            </div>
        </div>
    );
};

export default UserPositionForm;
