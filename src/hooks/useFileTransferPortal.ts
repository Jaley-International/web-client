import {useEffect, useState} from "react";
import {randomString} from "../util/string";

export function useFileTransferPortal() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [portalId] = useState(`filetransfer-portal-${randomString(8)}`);

    useEffect(() => {
        const div = document.createElement("div");
        div.id = portalId;
        const body = document.querySelector("body");
        body?.prepend(div);
        setLoaded(true);
        return () => body?.removeChild(div) as void;
    }, [portalId]);

    return {loaded, portalId};
}
