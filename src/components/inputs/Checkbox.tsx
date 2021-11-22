import {randomString} from "../../util/util";
import React, {LegacyRef, useState} from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string;
    name: string;
    check: boolean;
    required?: boolean;
    className?: string;
}

const Checkbox = React.forwardRef((props: Props, ref: LegacyRef<HTMLInputElement> | undefined) => {

    const [checked, setChecked] = useState(props.check);

    const id = randomString(8);
    return (
        <div className={props.className}>
            <label className="block text-txt-body text-xs inline-flex space-x-2" htmlFor={id}>
                <input ref={ref} className="w-5 h-5 focus:ring-blue-light disabled:cursor-not-allowed rounded-sm border-input-border outline-none transition-colors duration-200 ease-in-out" required={props.required} type="checkbox" id={id} name={props.name} checked={checked} onChange={() => setChecked(!checked)} />
                {props.children}
            </label>
        </div>
    );
});

export default Checkbox;
