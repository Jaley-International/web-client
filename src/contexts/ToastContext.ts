import {createContext} from "react";
import {AddToastFunction} from "../components/toast/ToastProvider";

const ToastContext = createContext<AddToastFunction>(_ => {});

export default ToastContext;
