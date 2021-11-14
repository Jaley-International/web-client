import {randomString} from "../../util/util";
import {useState} from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string;
    name: string;
    check: boolean;
    required?: boolean;
    className?: string;
}

function Checkbox({children, name, check, required, className}: Props): JSX.Element {

    const [checked, setChecked] = useState(check);

    const id = randomString(8);
    return (
        <div className={className}>
            <label className="block text-txt-body text-xs inline-flex space-x-2" htmlFor={id}>
                <input className="w-5 h-5 focus:ring-blue-light rounded-sm border-input-border outline-none transition-colors duration-200 ease-in-out" required={required} type="checkbox" id={id} name={name} checked={checked} onChange={() => setChecked(!checked)} />
                {children}
            </label>
        </div>
    );
}

export default Checkbox;
