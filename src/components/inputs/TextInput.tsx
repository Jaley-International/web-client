import {randomString} from "../../util/util";
import {ChangeEventHandler} from "react";

interface Props {
    type: "text" | "number" | "email" | "password" | "tel" | "date" | "time" | "datetime-local" | "url";
    autocomplete?: "on" | "off" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";
    label: string;
    name: string;
    value?: any;
    placeholder?: string;
    required?: boolean;
    className?: string;
    hint?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

function TextInput({type, autocomplete, label, required, name, value, placeholder, className, hint, onChange}: Props): JSX.Element {
    const id = randomString(8);
    return (
        <div className={className}>
            <label className="text-txt-body text-xs" htmlFor={id}>{label}</label><br />
            <input className="min-w-full py-1 px-3 h-11 bg-gray-100 bg-opacity-50 focus:bg-white rounded-lg border border-input-border focus:border-blue focus:ring-2 focus:ring-blue-soft outline-none leading-8 transition-colors duration-200 ease-in-out" type={type} required={required} autoComplete={autocomplete} id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
            {hint &&
                <span className="text-txt-body-muted text-3xs">{hint}</span>
            }
        </div>
    );
}

export default TextInput;
