import { useEffect, useState } from 'react';
import {ToastProps} from "../components/toast/Toast";

export function useToastAutoClose(toasts: ToastProps[], setToasts: (toasts: ToastProps[]) => void): void {

    const [removing, setRemoving] = useState("");

    useEffect(() => {
        if (removing)
            setToasts(toasts.filter(t => t.key !== removing));
    }, [removing]);

    useEffect(() => {
        if (toasts.length) {
            setTimeout(() => {
                const key = toasts[toasts.length - 1].key;
                if (key) {
                    setRemoving(key);
                }
            }, 9950);
        }
    }, [toasts]);
}
