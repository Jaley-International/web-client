import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";
import {useRef} from "react";
import {ShareLink} from "../../../helper/processes";
import forge from "node-forge";
import {hexToBase64Url} from "../../../util/string";
import {decrypt} from "../../../helper/security";
import {useTranslations} from "use-intl";

interface Props {
    sharelink: ShareLink;
    closeCallback: () => void;
}

function ShareLinkModal(props: Props): JSX.Element {

    const t = useTranslations();

    const linkRef = useRef<HTMLInputElement>(null);

    const shareKey = decrypt(
        "AES-CTR",
        localStorage.getItem("masterKey") || "",
        forge.util.hexToBytes(props.sharelink.iv),
        props.sharelink.encryptedShareKey);

    const link = "https://" + window.location.hostname + "/share#" + hexToBase64Url(props.sharelink.shareId) + "#" + hexToBase64Url(shareKey);

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={t("modal.node.link-share.title")} className="text-center" />
                    <div className="py-8 px-20">

                        <TextInput ref={linkRef} type="text" label={t("modal.node.link-share.link")} readOnly value={link} onClick={async () => {
                            if (linkRef.current) {
                                linkRef.current?.select();
                                await navigator.clipboard.writeText(linkRef.current?.value);
                            }
                        }} />

                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="blue" onClick={props.closeCallback}>{t("generic.action.close")}</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ShareLinkModal;
