import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useRouter} from "next/router";
import Users from "../../fixtures/Users";
import Card from "../../components/containers/Card";
import {Heading2} from "../../components/text/Headings";

function UserPage(): JSX.Element {

    const router = useRouter();
    const {id} = router.query;

    const user = Users.filter((user) => user.userId.toString() === id)[0];

    if (user) {
        return (
            <div className="flex bg-bg-light">
                <Navbar />
                <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                    <Header title="User details">
                        <Link href="/users">
                            <Button size="small" type="regular" colour="dark">
                                <span><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Back to user list</span>
                            </Button>
                        </Link>
                    </Header>

                    <div className="w-full p-8">

                        <div className="mb-10">
                            <div className="flex space-x-4">
                                {user.profilePicture ?
                                    <div className="bg-cover bg-center w-9 h-9 rounded-full w-24 lg:w-32 h-24 lg:h-32 my-auto" style={{backgroundImage: `url(${user.profilePicture})`}}/>
                                :
                                    <div className="grid rounded-full w-24 lg:w-32 h-24 lg:h-32 bg-silver my-auto">
                                        <FontAwesomeIcon className="m-auto text-silver-dark text-4xl lg:text-6xl" icon={faUser} />
                                    </div>
                                }
                                <div>
                                    <p className="text-xl font-semibold text-txt-heading">{user.firstName} {user.lastName}</p>
                                    <p>{user.job}, {user.group}</p>
                                    <p className="text-txt-body align-bottom">{user.email}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    } else {
        return (
            <div className="flex bg-bg-light">
                <Navbar />
                <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                    <Header title="User details">
                        <Link href="/users">
                            <Button size="small" type="regular" colour="dark">
                                <span><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Back to user list</span>
                            </Button>
                        </Link>
                    </Header>

                    <div className="w-full py-40">
                        <Card className="w-1/2 mx-auto my-auto">
                            <div className="flex p-4">
                                <div className="w-full p-10">
                                    <Heading2>User not found.</Heading2>
                                    <span className="text-txt-body">The user you are looking does not exists or has been deleted.</span>
                                </div>
                                <div className="p-12 bg-red-soft rounded-xl">
                                    <div className="w-full h-full flex justify-center">
                                        <Link href="/users">
                                            <Button className="mx-auto my-auto w-24" size="medium" type="regular" colour="red">Go back</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserPage;
