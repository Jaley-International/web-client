import getConfig from "next/config";
import {useTranslations} from "use-intl";
import {useEffect, useRef, useState} from "react";
import {request, Status} from "../../../helper/communication";
import {createNodeShareLink, Node} from "../../../helper/processes";
import {decrypt} from "../../../helper/security";
import forge from "node-forge";
import {hexToBase64Url} from "../../../util/string";
import TextInput from "../../inputs/TextInput";

interface Props {
    node: Node;
}

function LinkSharing(props: Props): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const t = useTranslations();

    const linkRef = useRef<HTMLInputElement>(null);


    const [link, setLink] = useState<string>("...");

    const createLink = async () => {
        const response = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${props.node.id}/links`, {});
        if (response.status !== Status.SUCCESS)
            return;

        if (response.data.links.length === 0) {
            const shareLink = await createNodeShareLink(props.node);
            if (shareLink)
                props.node.shareLink = shareLink;
        } else {
            props.node.shareLink = response.data.links[0];
        }
        setLink(getLink());
    };

    useEffect(() => {
        if (props.node.type === "FOLDER") return;

        if (!props.node.shareLink)
            createLink().then(_ => {});
        else
            setLink(getLink());
    });

    const getLink = () => {
        if (!props.node.shareLink)
            return "...";
        const shareKey = decrypt(
            "AES-CTR",
            localStorage.getItem("masterKey") || "",
            forge.util.hexToBytes(props.node.shareLink.iv),
            props.node.shareLink.encryptedShareKey);
        return "https://" + window.location.hostname + "/share#" + hexToBase64Url(props.node.shareLink.shareId) + "#" + hexToBase64Url(shareKey);
    };

    return (
        <>
            {props.node.type === "FILE" &&
                <TextInput ref={linkRef} type="text" label={t("modal.node.share.link.label")} readOnly value={link}
                           onClick={async () => {
                               if (linkRef.current) {
                                   linkRef.current?.select();
                                   await navigator.clipboard.writeText(linkRef.current?.value);
                               }
                           }}/>
            }
            {props.node.type === "FOLDER" &&
                <p className="text-center">{t("modal.node.share.link.folder-wip")}</p>
            }
        </>
    );
}

export default LinkSharing;
