import { useState, useEffect } from 'react';
import {randomString} from "../util/util";

export function useToastPortal() {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`toast-portal-${randomString(8)}`);

    useEffect(() => {
        const div = document.createElement("div");
        div.id = portalId;
        div.setAttribute("style", "position: fixed; top: 10px; right: 10px; z-index: 999;");
        const body = document.querySelector("body");
        body?.prepend(div);
        setLoaded(true);
        return () => body?.removeChild(div) as void;
    }, [portalId]);

    return { loaded, portalId };
}
