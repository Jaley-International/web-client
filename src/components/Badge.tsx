interface Props {
    text: string;
    size: "large" | "medium" | "small";
    colour: "blue" | "green" | "orange" | "red" | "cyan" | "dark";
    className?: string;
}

function Badge(props: Props): JSX.Element {
    let sizeClass = "rounded-md px-6 py-2 text-xs";
    if (props.size === "large")
        sizeClass = "rounded-lg px-10 py-3 text-md";
    else if (props.size === "small")
        sizeClass = "rounded-md px-3 py-1 text-2xs";

    return (
        <span className={`font-semibold text-${props.colour} bg-${props.colour}-soft ${sizeClass} ${props.className}`}>
            {props.text}
        </span>
    );
}

export default Badge;
