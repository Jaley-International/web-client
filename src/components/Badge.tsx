import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    text: string;
    size: "large" | "medium" | "small" | "extrasmall";
    colour: "blue" | "green" | "orange" | "red" | "cyan" | "dark" | "light";
    className?: string;
    removeCallback?: () => void;
    clickCallback?: () => void;
}

function Badge(props: Props): JSX.Element {
    let sizeClass = "rounded-md px-6 py-2 text-xs";
    if (props.size === "large")
        sizeClass = "rounded-lg px-10 py-3 text-md";
    else if (props.size === "small")
        sizeClass = "rounded-md px-3 py-1 text-2xs";
    else if (props.size === "extrasmall")
        sizeClass = "rounded-md px-2 py-0.5 text-4xs";

    return (
        <>
            <span
                className={`font-semibold select-none
                    ${props.colour === "dark" ?
                        `text-white bg-${props.colour}` : `${props.colour === "light" ? `text-txt-heading bg-silver` : `text-${props.colour} bg-${props.colour}-soft`}`
                    }
                    ${props.clickCallback ? "cursor-pointer" : ""}
                    ${props.removeCallback ? "pr-2" : ""}
                    ${sizeClass}
                    ${props.className}`
                }
            >
                <span onClick={props.clickCallback}>
                    {props.text}
                </span>
                {props.removeCallback &&
                <span className="font-light cursor-pointer" onClick={props.removeCallback}>
                    &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faTimes} />
                </span>}
            </span>
        </>
    );
}

export default Badge;
