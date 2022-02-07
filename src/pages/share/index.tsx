import {useRouter} from "next/router";
import Card from "../../components/containers/Card";
import {Heading2, Heading3} from "../../components/text/Headings";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import React, {useEffect, useState} from "react";
import Badge from "../../components/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloud, faDownload, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {base64UrlToHex} from "../../util/util";
import {request} from "../../util/communication";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {ShareLink} from "../../util/security";

function SharePage({apiUrl}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {

    const [sharelink, setSharelink] = useState<ShareLink | null>(null);
    const [shareKey, setSharekey] = useState<string | null>(null);

    const router = useRouter();
    const params = router.asPath.split("#");

    useEffect(() => {

        let id = null;
        if (params && params.length == 3) {
            id = base64UrlToHex(params[1]);
            setSharekey(base64UrlToHex(params[2]));

            request("GET", `${apiUrl}/link/${id}`, {}).then((response) => {
                if (response.status === "SUCCESS")
                    setSharelink(response.data);
            });
        }
    }, []);



    if (shareKey && sharelink) {
        return (
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
                            <Heading2>Creditor bank details.pdf</Heading2>
                            <div className="flex space-x-2 pt-2">
                                <Badge text="238 kB" size="small" colour="blue" />
                                <Badge text="PDF Document" size="small" colour="blue" />
                            </div>
                        </div>
                        <div className="p-12 bg-blue-soft rounded-xl">
                            <div className="w-full h-full flex justify-center">
                                <Button className="mx-auto my-auto w-32" size="medium" type="regular" colour="blue" onClick={() => {
                                    // TODO File share link download
                                    alert("TODO File download");
                                }}>
                                    <span><FontAwesomeIcon icon={faDownload} />&nbsp;&nbsp;Download</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        );
    } else {
        return (
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
