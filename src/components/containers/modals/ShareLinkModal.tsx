import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";
import {useRef} from "react";
import {ShareLink} from "../../../util/processes";
import forge from "node-forge";
import {hexToBase64Url} from "../../../util/util";
import {decrypt} from "../../../util/security";

interface Props {
    sharelink: ShareLink;
    closeCallback: () => void;
}

function ShareLinkModal(props: Props): JSX.Element {

    const linkRef = useRef<HTMLInputElement>(null);

    const shareKey = decrypt(
        "AES-CTR",
        sessionStorage.getItem("masterKey") || "",
        forge.util.hexToBytes(props.sharelink.iv),
        props.sharelink.encryptedShareKey);

    const link = "https://" + window.location.hostname + "/share#" + hexToBase64Url(props.sharelink.shareId) + "#" + hexToBase64Url(shareKey);

    return (
        <>
            <div className="z-10 absolute w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title="Share by link" className="text-center" />
                    <div className="py-8 px-20">

                        <TextInput ref={linkRef} type="text" label={"Private share link"} readOnly value={link} onClick={async () => {
                            if (linkRef.current) {
                                linkRef.current?.select();
                                await navigator.clipboard.writeText(linkRef.current?.value);
                            }
                        }} />

                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="blue" onClick={props.closeCallback}>Close</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ShareLinkModal;
