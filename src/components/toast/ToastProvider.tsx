import ToastContext from "../../contexts/ToastContext";
import {ToastProps} from "./Toast";
import ToastPortal, {ToastRef} from "./ToastPortal";
import {useRef} from "react";

export type AddToastFunction = (toast: ToastProps) => void;

interface Props {
    children: JSX.Element;
}

function ToastProvider(props: Props): JSX.Element {

    const toastRef = useRef<ToastRef>(null);
    const addToast: AddToastFunction = (toast) => {
        toastRef.current?.addMessage(toast);
    };

    return (
        <ToastContext.Provider value={addToast}>
            <>
                {props.children}
                <ToastPortal ref={toastRef} />
            </>
        </ToastContext.Provider>
    );
}

export default ToastProvider;
