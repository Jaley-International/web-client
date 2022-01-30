import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useRouter} from "next/router";

function UserPage(): JSX.Element {

    const router = useRouter();
    const {id} = router.query;

    return (
        <div className="flex">
            <Navbar />
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="{firstName} {lastName}">
                    <Link href="/users">
                        <Button size="small" type="regular" colour="dark">
                            <span><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Back to user list</span>
                        </Button>
                    </Link>
                </Header>

                <div className="w-full p-8">
                    TODO<br />
                    {id}
                </div>

            </div>
        </div>
    );
}

export default UserPage;
