import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faCloud, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {Heading2, Heading3} from "../components/text/Headings";
import Card from "../components/containers/Card";
import React from "react";
import Button from "../components/buttons/Button";

function NotFoundPage(): JSX.Element {
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
                    <div className="p-12 flex justify-center items-center bg-red-soft rounded-xl text-center">
                            <span className="text-3xl text-red">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            </span>
                    </div>
                    <div className="w-full p-10">
                        <Heading2>404 Error</Heading2>
                        <span className="text-txt-body">The page/resource you requested does not exist or has been moved.</span>
                    </div>
                    <div className="p-12">
                        <div className="w-full h-full flex justify-center">
                            <Button className="mx-auto my-auto w-32" size="medium" type="regular" colour="dark" onClick={() => {
                                window.history.back();
                            }}>
                                <span><FontAwesomeIcon icon={faChevronCircleLeft} />&nbsp;&nbsp;Back</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
    );
}

export default NotFoundPage;
