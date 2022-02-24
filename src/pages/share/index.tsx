import {useRouter} from "next/router";
import Card from "../../components/containers/Card";
import {Heading2, Heading3} from "../../components/text/Headings";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import React, {useContext, useEffect, useState} from "react";
import Badge from "../../components/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloud, faDownload, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {base64UrlToHex, formatBytes} from "../../util/string";
import {request} from "../../helper/communication";
import {ShareLink, Node, EncryptedNode, downloadFile} from "../../helper/processes";
import forge from "node-forge";
import {decrypt} from "../../helper/security";
import getConfig from "next/config";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";

function SharePage(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();

    const addToast = useContext(ToastContext);

    const [loaded, setLoaded] = useState<boolean>(false);
    const [node, setNode] = useState<Node | null>(null);

    const router = useRouter();
    const params = router.asPath.split("#");

    useEffect(() => {

        let id = null;
        if (params && params.length == 3) {
            id = base64UrlToHex(params[1]);
            const shareKey = base64UrlToHex(params[2]);

            request("GET", `${publicRuntimeConfig.apiUrl}/links/${id}/node`, {}).then((response) => {

                if (response.status === "SUCCESS") {

                    const sharelink: ShareLink = response.data.link;
                    const encryptedNode: EncryptedNode = response.data.node;

                    try {
                        // FIXME nodekey <> sharekey
                        //const nodeKey = decrypt("AES-CTR", shareKey, forge.util.hexToBytes(sharelink.iv), encryptedNode.encryptedKey);
                        const nodeKey = shareKey;
                        setNode({
                            children: [],
                            id: encryptedNode.id,
                            iv: encryptedNode.iv,
                            metaData: JSON.parse(decrypt("AES-CTR", nodeKey, forge.util.hexToBytes(encryptedNode.iv), encryptedNode.encryptedMetadata)),
                            nodeKey: nodeKey,
                            parentKey: "",
                            ref: "",
                            shareLink: response.data.link,
                            tag: encryptedNode.tag,
                            type: encryptedNode.type
                        });
                    } catch (e) {
                        console.error(e)
                    } finally {
                        setLoaded(true);
                    }
                }
            });
        }
    });


    if (node) {
        return (
            <ContentTransition className="h-screen bg-bg-light">
                <Link href="/" passHref>
                    <div className="p-8 h-8 inline-flex space-x-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-white py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="text-blue h-12 py-2">Private Encrypted Cloud</Heading3>
                    </div>
                </Link>

                <Card className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
                    <div className="md:flex p-4">
                        <div className="w-full p-10">
                            <Heading2>{node.metaData.name}</Heading2>
                            <div className="flex space-x-2 pt-2">
                                <Badge text={formatBytes(node.metaData.size || 0)} size="small" colour="blue" />
                                <Badge text={node.metaData.name.split(".").pop()?.toUpperCase() + " File"} size="small" colour="blue" />
                            </div>
                        </div>
                        <div className="p-12 bg-blue-soft rounded-xl">
                            <div className="w-full h-full flex justify-center">
                                <Button className="mx-auto my-auto w-32" size="medium" type="regular" colour="blue" onClick={async () => {
                                    const status = await downloadFile(node);
                                    if (status === "ERROR_FETCH")
                                        addToast({type: "error", title: "Failed to download", message: "An error occurred while fetching the file."});
                                    else if (status === "ERROR_DECRYPT")
                                        addToast({type: "error", title: "Failed to decrypt", message: "An error occurred while decrypting the file."});
                                    else if (status !== "SUCCESS")
                                        addToast({type: "error", title: "Failed to download", message: "An unexpected error occurred while downloading the file."});
                                }}>
                                    <span><FontAwesomeIcon icon={faDownload} />&nbsp;&nbsp;Download</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </ContentTransition>
        );
    } else if (loaded) {
        return (
            <ContentTransition className="h-screen bg-bg-light">
                <Link href="/" passHref>
                    <div className="p-8 h-8 inline-flex space-x-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-white py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="text-blue h-12 py-2">Private Encrypted Cloud</Heading3>
                    </div>
                </Link>

                <Card className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
                    <div className="md:flex p-4">
                        <div className="p-12 flex justify-center items-center bg-red-soft rounded-xl text-center">
                            <span className="text-3xl text-red">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            </span>
                        </div>
                        <div className="w-full p-10">
                            <Heading2>Download unavailable</Heading2>
                            <span className="text-txt-body">The link you provided is invalid or expired.</span>
                        </div>
                    </div>
                </Card>

            </ContentTransition>
        );
    } else {
        return (
            <></>
        )
    }

}

export default SharePage;
