import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";
import {useToastPortal} from "../../hooks/useToastPortal";
import Toast, {ToastProps} from "./Toast";
import {randomString} from "../../util/string";
import {useToastAutoClose} from "../../hooks/useToastAutoClose";

export interface ToastRef {
    addMessage: (toast: ToastProps) => void;
}

const ToastPortal = forwardRef((props, ref: Ref<ToastRef>) => {

    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const {loaded, portalId} = useToastPortal();
    useToastAutoClose(toasts, setToasts);

    const removeToast = (key: string) => {
        setToasts(toasts.filter(t => t.key !== key));
    };

    useImperativeHandle(ref, () => ({
        addMessage(toast: ToastProps) {
            setToasts([...toasts, {...toast, key: randomString(8)}]);
        }
    }));

    return loaded ? (
        createPortal(
            <div>
                {toasts.map(t => (
                    <Toast key={t.key} type={t.type} title={t.title} message={t.message} onClose={() => t.key && removeToast(t.key)} />
                ))}
            </div>,
            document.getElementById(portalId) as Element
        )
    ) : (
        <></>
    );
});

ToastPortal.displayName = "ToastPortal";
export default ToastPortal;
