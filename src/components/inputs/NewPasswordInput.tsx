import React, {ChangeEventHandler, LegacyRef, useState} from "react";
import {randomString} from "../../util/util";
import zxcvbn from "zxcvbn";

interface Props {
    label: string;
    name: string;
    value?: any;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    [propName: string]: any;
}

interface PasswordStrength {
    level: 0 | 1 | 2 | 3 | 4;
    hint: string;
}

const passwordMeter = (password: string): PasswordStrength => {
    const result = zxcvbn(password);
    let hint = "Must be at least 12 characters long. Should contain numbers, upper and lower case letters.";
    if (result.feedback.warning)
        hint = (result.feedback.warning);
    return {level: password.length === 0 ? 0 : (result.score === 0) ? 1 : result.score, hint: hint};
};

const NewPasswordInput = React.forwardRef((props: Props, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const id = randomString(8);

    const [passwordStrength, setPasswordStrength] = useState(passwordMeter(""));

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (props.onChange)
            props.onChange(e);
        setPasswordStrength(passwordMeter(e.target.value));
        if (passwordStrength.level < 4)
            e.target.setCustomValidity("Password is too weak.");
        else if (passwordStrength.level === 4)
            e.target.setCustomValidity("");
    }

    const bars = (level: number): JSX.Element[] => {
        let divs: JSX.Element[] = [];
        for (let i = 1 ; i < 5 ; ++i)
            divs.push(<div className={`flex-1 ${i > level ? "bg-grey-300" : (level === 1 ? "bg-red" : (level === 2 ? "bg-orange" : (level === 3 ? "bg-green-light" : "bg-green")))} h-1.5 rounded-full`}> </div>)
        return divs;
    }

    return (
        <div className={props.className}>
            <label className="text-txt-body text-xs" htmlFor={id}>{props.label}</label><br />
            <input {...props} type="password" autoComplete="new-password" className={`min-w-full py-1 px-3 h-11 bg-gray-100 bg-opacity-50 disabled:bg-grey-100 disabled:text-txt-body-muted disabled:cursor-not-allowed focus:bg-white rounded-lg border focus:ring-2 ${passwordStrength.level && passwordStrength.level < 3 ? "border-red-light focus:border-red focus:ring-red-soft" : "border-input-border focus:border-blue focus:ring-blue-soft"} outline-none leading-8 transition-colors duration-200 ease-in-out`} ref={ref} id={id} name={props.name} value={props.value} onChange={onChange} />
            <div className="mt-2 flex space-x-4">
                {bars(passwordStrength.level)}
            </div>
            <span className={`${passwordStrength.level && passwordStrength.level < 3 ? "text-red" : "text-txt-body-muted"} text-3xs`}>{passwordStrength.hint}</span>
        </div>
    );
});

NewPasswordInput.displayName = "NewPasswordInput";
export default NewPasswordInput;
