import {useRouter} from "next/router";
import Card from "../../components/containers/Card";
import {Heading2, Heading3} from "../../components/text/Headings";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import React, {useEffect, useRef, useState} from "react";
import Badge from "../../components/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloud, faDownload, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {base64UrlToHex} from "../../util/util";
import {request} from "../../util/communication";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {ShareLink, Node, EncryptedNode, decrypt, downloadFile} from "../../util/security";
import forge from "node-forge";
import ToastPortal, {ToastRef} from "../../components/toast/ToastPortal";
import {ToastProps} from "../../components/toast/Toast";

function SharePage({apiUrl}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {

    const toastRef = useRef<ToastRef>(null);
    const addToast = (toast: ToastProps) => {
        toastRef.current?.addMessage(toast);
    };

    const [node, setNode] = useState<Node | null>(null);

    const router = useRouter();
    const params = router.asPath.split("#");

    useEffect(() => {

        let id = null;
        if (params && params.length == 3) {
            id = base64UrlToHex(params[1]);
            const shareKey = base64UrlToHex(params[2]);

            request("GET", `${apiUrl}/link/node/${id}`, {}).then((response) => {

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
                    }
                }
            });
        }
    }, []);



    if (node) {
        return (
            <>
                <div className="h-screen bg-bg-light">
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
                                    <Badge text="238 kB" size="small" colour="blue" />
                                    <Badge text={node.metaData.name.split(".").pop()?.toUpperCase() + " File"} size="small" colour="blue" />
                                </div>
                            </div>
                            <div className="p-12 bg-blue-soft rounded-xl">
                                <div className="w-full h-full flex justify-center">
                                    <Button className="mx-auto my-auto w-32" size="medium" type="regular" colour="blue" onClick={async () => {
                                        console.log(node)
                                        await downloadFile(node, apiUrl, addToast);
                                    }}>
                                        <span><FontAwesomeIcon icon={faDownload} />&nbsp;&nbsp;Download</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
                <ToastPortal ref={toastRef}/>
            </>
        );
    } else {
        return (
            <>
                <div className="h-screen bg-bg-light">
                    <Link href="/">
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

                </div>
                <ToastPortal ref={toastRef}/>
            </>
        );
    }

}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            apiUrl: process.env.PEC_CLIENT_API_URL
        }
    };
};

export default SharePage;
