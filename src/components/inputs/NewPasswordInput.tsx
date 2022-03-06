import React, {ChangeEventHandler, LegacyRef, useState} from "react";
import {randomString} from "../../util/string";
import zxcvbn from "zxcvbn";
import {useTranslations} from "use-intl";

interface Props {
    label: string;
    name: string;
    value?: any;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    [propName: string]: any;
}

interface PasswordStrength {
    level: number;
    hint: string[];
}


const NewPasswordInput = React.forwardRef((props: Props, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const t = useTranslations("components.password-strength-input");
    const id = randomString(8);


    const passwordMeter = (password: string): PasswordStrength => {

        if (password.length === 0)
            return {level: 0, hint: [" "]};

        if (password.length < 8)
            return {level: 1, hint: [t("too-short")]};

        const evaluation = zxcvbn(password);
        if (evaluation.feedback.warning)
            return {level: 1, hint: [t("too-guessable")]};


        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

        let level = evaluation.score;
        let hint: string[] = [];

        if (evaluation.score < 4 || password.length < 12)
            hint.push(t("too-weak"));
        if ([hasLowercase, hasUppercase, hasDigit, hasSpecialChar].filter(r => r).length < 3) {
            if (!hasLowercase)
                hint.push(t("missing-lowercase"));
            if (!hasUppercase)
                hint.push(t("missing-uppercase"));
            if (!hasDigit)
                hint.push(t("missing-digit"));
            if (!hasSpecialChar)
                hint.push(t("missing-special"));
        } else {
            level += 1;
        }

        return {
            level: level,
            hint: hint
        };
    };


    const [passwordStrength, setPasswordStrength] = useState(passwordMeter(""));

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (props.onChange)
            props.onChange(e);
        const result = passwordMeter(e.target.value);
        setPasswordStrength(result);
        if (result.level === 5)
            e.target.setCustomValidity("");
        else
            e.target.setCustomValidity(t("requirement"));
    }

    const bars = (level: number): JSX.Element[] => {
        let divs: JSX.Element[] = [];
        for (let i = 1 ; i <= 5 ; ++i)
            divs.push(<div key={i} className={`flex-1 ${i > level ? "bg-grey-300" : (level === 1 ? "bg-red" : (level === 2 ? "bg-orange" : (level === 3 ? "bg-red-gradient-from" : (level === 4 ? "bg-green-light" : "bg-green"))))} h-1.5 rounded-full`}> </div>)
        return divs;
    }

    return (
        <div className={props.className}>
            <label className="text-txt-body text-xs" htmlFor={id}>{props.label}</label><br />
            <input {...props} type="password" autoComplete="new-password" className={`min-w-full py-1 px-3 h-11 bg-gray-100 bg-opacity-50 disabled:bg-grey-100 disabled:text-txt-body-muted disabled:cursor-not-allowed focus:bg-white rounded-lg border focus:ring-2 ${passwordStrength.level && passwordStrength.level < 3 ? "border-red-light focus:border-red focus:ring-red-soft" : "border-input-border focus:border-blue focus:ring-blue-soft"} outline-none leading-8 transition-colors duration-200 ease-in-out`} ref={ref} id={id} name={props.name} value={props.value} onChange={onChange} />
            <div className="mt-2 flex space-x-4">
                {bars(passwordStrength.level)}
            </div>
            <span className={`${passwordStrength.level && passwordStrength.level < 5 ? "text-red" : "text-txt-body-muted"} text-3xs`}>{passwordStrength.hint.map((hint, i) => {
                return <span key={i}>{hint}<br /></span>;
            })}</span>
        </div>
    );
});

NewPasswordInput.displayName = "NewPasswordInput";
export default NewPasswordInput;
