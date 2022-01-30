import React, {LegacyRef, MouseEventHandler} from "react";

interface Props {
    children: JSX.Element | JSX.Element[] | string;
    size: "large" | "medium" | "small";
    type: "regular" | "soft" | "outline";
    action?: "submit" | "reset" | "button";
    colour: "blue" | "green" | "orange" | "red" | "cyan" | "dark";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button = React.forwardRef((props: Props, ref: LegacyRef<HTMLButtonElement> | undefined) => {
    let sizeClass = "rounded-md px-6 py-2 text-2xs";
    if (props.size === "large")
        sizeClass = "rounded-lg px-10 py-3 text-xs";
    else if (props.size === "small")
        sizeClass = "rounded-sm px-3 py-1 text-4xs";

    let typeClass = `text-white bg-${props.colour} hover:bg-opacity-90 active:bg-opacity-80 disabled:bg-opacity-70`;
    if (props.type === "soft")
        typeClass = `text-${props.colour} bg-${props.colour}-soft hover:bg-${props.colour} active:bg-${props.colour} hover:bg-opacity-20 active:bg-opacity-30 disabled:bg-opacity-50 disabled:bg-${props.colour}-soft disabled:text-grey-600`;
    else if (props.type === "outline")
        typeClass = `text-${props.colour} border border-${props.colour} bg-${props.colour}-soft bg-opacity-0 hover:bg-opacity-50 active:bg-opacity-70 disabled:bg-opacity-0 disabled:border-grey-400`;

    return (
        <button ref={ref} type={props.action} onClick={props.onClick}
                className={`font-semibold transition-colors duration-100 ease-in-out disabled:cursor-default ${sizeClass} ${typeClass} ${props.className}`}>
            {props.children}
        </button>
    );
});

Button.displayName = "Button";
export default Button;
