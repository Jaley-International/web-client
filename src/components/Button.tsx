import {MouseEventHandler} from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string;
    size: "large" | "medium" | "small";
    type: "regular" | "soft" | "outline";
    action?: "submit" | "reset" | "button";
    colour: "blue" | "green" | "orange" | "red" | "cyan" | "dark";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

function Button({children, size, type, action, colour, onClick, className}: Props): JSX.Element {
    let sizeClass = "rounded-md px-6 py-2 text-2xs";
    if (size === "large")
        sizeClass = "rounded-lg px-10 py-3 text-xs";
    else if (size === "small")
        sizeClass = "rounded-sm px-3 py-1 text-4xs";

    let typeClass = `text-white bg-${colour} hover:bg-opacity-90 active:bg-opacity-80`;
    if (type === "soft")
        typeClass = `text-${colour} bg-${colour}-soft hover:bg-${colour} active:bg-${colour} hover:bg-opacity-20 active:bg-opacity-30`;
    else if (type === "outline")
        typeClass = `text-${colour} border border-${colour} bg-${colour}-soft bg-opacity-0 hover:bg-opacity-50 active:bg-opacity-70`;

    return (
        <button type={action} onClick={onClick} className={`font-semibold transition-colors duration-100 ease-in-out ${sizeClass} ${typeClass} ${className}`}>
            {children}
        </button>
    );
}

export default Button;
