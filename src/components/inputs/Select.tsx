import React, {LegacyRef} from "react";
import {randomString} from "../../util/util";

interface Props {
    children: JSX.Element[];
    label: string;
    className?: string;
    hint?: string;
    defaultValue?: string;
    [propName: string]: any;
}

const Select = React.forwardRef((props: Props, ref: LegacyRef<HTMLSelectElement> | undefined) => {
    const id = randomString(8);

    return (
        <div className={props.className}>
            <label className="text-txt-body text-xs" htmlFor={id}>{props.label}</label><br />
            <select ref={ref} {...props} className="min-w-full py-1 px-3 h-11 disabled:cursor-not-allowed rounded-lg bg-white bg-opacity-50 focus:bg-white disabled:bg-grey-100 border border-input-border focus:border-blue focus:ring-blue-soft focus:ring-2 outline-none leading-8 transition-colors duration-200 ease-in-out">
                {!props.disabled &&
                    <option disabled={true} selected={true} value={""}>-- Please select -- </option>
                }
                {props.children}
            </select>
            {props.hint &&
                <span className="text-3xs">{props.hint}</span>
            }
        </div>
    );
});

export default Select;
