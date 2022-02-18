import {useMemo, useState} from "react";
import {
    faCheckCircle,
    faTimes,
    faInfoCircle,
    faExclamationTriangle,
    faExclamationCircle,
    IconDefinition,
    faChevronUp, faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastProps {
    type: ToastType;
    title: string;
    message: string;
    onClose?: () => void;
    key?: string;
}

interface style {
    icon: IconDefinition;
    colour: string;
}

function Toast(props: ToastProps): JSX.Element {

    const [expanded, setExpanded] = useState<boolean>(false);

    const style = useMemo((): style => {
        switch (props.type) {
            case "info":
                return {icon: faInfoCircle, colour: "blue"};
            case "success":
                return {icon: faCheckCircle, colour: "green"};
            case "warning":
                return {icon: faExclamationTriangle, colour: "orange"};
            case "error":
                return {icon: faExclamationCircle, colour: "red"};
        }
    }, [props.type]);

    return (
        <div className="w-96 flex flex-col items-center space-y-4 sm:items-end mb-4 animate-fadeIn">
            <div className="max-w-sm w-full bg-white shadow-md rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 animate-pulse">
                            <FontAwesomeIcon icon={style.icon} className={`h-6 w-6 text-${style.colour}`} aria-hidden="true" />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-txt-heading cursor-pointer" onClick={() => setExpanded(!expanded)}>
                                {props.title}
                            </p>
                            {expanded &&
                                <p className="mt-1 text-sm text-txt-body">{props.message}</p>
                            }
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-3">
                            <button className="bg-white rounded-md inline-flex text-grey-500 transition-colors hover:text-grey-600 focus:outline-none" onClick={() => setExpanded(!expanded)}>
                                <span className="sr-only">{expanded ? "Retract" : "Expand"}</span>
                                <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button className="bg-white rounded-md inline-flex text-grey-500 transition-colors hover:text-grey-600 focus:outline-none" onClick={props.onClose}>
                                <span className="sr-only">Close</span>
                                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`w-full object-cover object-center h-1 bg-${style.colour} animate-backProgress`} />
            </div>
        </div>
    )
}

export default Toast;
