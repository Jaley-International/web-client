import React, {ChangeEventHandler, LegacyRef, useState} from "react";
import {randomString} from "../../util/util";

interface Props {
    type: "text" | "number" | "email" | "password" | "tel" | "date" | "time" | "datetime-local" | "url";
    label: string;
    name: string;
    value?: any;
    className?: string;
    hint?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    validator?: (str: string) => boolean;
    [propName: string]: any;
}

const TextInput = React.forwardRef((props: Props, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const id = randomString(8);

    const [errored, setErrored] = useState(false);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (props.validator)
            setErrored(!props.validator(e.target.value));
        if (props.onChange)
            props.onChange(e);
    }

    return (
        <div className={props.className}>
            <label className="text-txt-body text-xs" htmlFor={id}>{props.label}</label><br />
            <input {...props} className={`min-w-full py-1 px-3 h-11 bg-gray-100 bg-opacity-50 focus:bg-white rounded-lg border focus:ring-2 ${errored ? "border-red-light focus:border-red focus:ring-red-soft" : "border-input-border focus:border-blue focus:ring-blue-soft"} outline-none leading-8 transition-colors duration-200 ease-in-out`} ref={ref} type={props.type} id={id} name={props.name} value={props.value} onChange={onChange} />
            {props.hint &&
            <span className={`${errored ? "text-red" : "text-txt-body-muted"} text-3xs`}>{props.hint}</span>
            }
        </div>
    );
});

export default TextInput;
