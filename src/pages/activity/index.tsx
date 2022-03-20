import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import ContentTransition from "../../components/sections/ContentTransition";
import React, {useEffect, useState} from "react";
import {GetStaticProps} from "next";
import EmptyActivities from "../../components/sections/EmptyActivities";
import {useRouter} from "next/router";
import Badge from "../../components/Badge";
import Activity from "../../components/activities/Activity";
import User, {UserAccessLevel} from "../../model/User";
import {decryptFileSystem, EncryptedNode, MetaData, Node, ShareLink} from "../../helper/processes";
import {request} from "../../helper/communication";
import getConfig from "next/config";
import {useTranslations} from "use-intl";
import FileUploadActivity from "../../components/activities/FileUploadActivity";
import {Hex} from "node-forge";

function ActivityPage(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const t = useTranslations();
    const router = useRouter();

    // TODO : Change states for entities themselves instead of ids
    const [node, setNode] = useState<Node | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchFilterEntities = async () => {

        // Fetch user
        const username = router.query.user;
        if (username && typeof username === "string") {
            const response = await request("GET", `${publicRuntimeConfig.apiUrl}/users/${username}`, {});
            if (response.status === "SUCCESS") {
                const rawUser = response.data.user;
                setUser({
                    username: rawUser.username,
                    email: rawUser.email,
                    firstName: rawUser.firstName,
                    lastName: rawUser.lastName,
                    profilePicture: null,
                    job: rawUser.job || "Unknown",
                    group: rawUser.group || "Unknown",
                    accessLevel: rawUser.accessLevel,
                    createdAt: rawUser.createdAt
                });
            } else {
                setUser(null);
            }
        } else {
            setUser(null);
        }

        // Fetch node
        const nodeId = router.query.node;
        if (nodeId && typeof +nodeId === "number") {
            const response = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${nodeId}`, {});
            if (response.status === "SUCCESS") {
                const decrypted = decryptFileSystem(response.data.filesystem as EncryptedNode, 0);
                setNode(decrypted ? decrypted : null);
            } else {
                setNode(null);
            }
        } else {
            setNode(null);
        }

        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchFilterEntities().then(_ => {});
    });

    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title={"Activity"}>
                    <div className="flex">
                        <div className="w-full space-x-4">

                            {node ?
                                <Badge text={`${t(`generic.node.${node.type.toLowerCase()}`)} : ${node.metaData.name}`} size="small" colour="dark"
                                       removeCallback={() => setNode(null)}
                                />
                            :
                                <Badge text="No file or folder selected" size="small" colour="light" />
                            }

                            {user ?
                                <Badge text={`User : ${user.firstName} ${user.lastName}`} size="small" colour="dark"
                                       removeCallback={() => setUser(null)}
                                />
                                :
                                <Badge text="No user selected" size="small" colour="light" />
                            }

                        </div>
                    </div>
                </Header>

                {loaded &&
                    <ContentTransition>
                    {(!user && !node) ?
                        <EmptyActivities />
                        :
                        <div className="pt-4 px-6 space-y-6 mb-2">
                            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((activity, index) => {
                                return (
                                    <FileUploadActivity
                                        activity={{
                                            user: {
                                                username: "eporet",
                                                email: "eva.poret@company.com",
                                                firstName: "Eva",
                                                lastName: "PORET",
                                                profilePicture: "https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                                                job: "",
                                                group: "",
                                                accessLevel: UserAccessLevel.USER,
                                                createdAt: 0
                                            },
                                            timestamp: 0
                                        }}
                                        node={{
                                            id: 42,
                                            iv: "abc",
                                            tag: "abc",
                                            nodeKey: "abc",
                                            metaData: {name: "2021 Expenses.csv"},
                                            type: "FILE",
                                            ref: "abc",
                                            parentKey: "abc",
                                            children: []
                                        }}
                                    />

                                );
                            })}
                        </div>
                    }
                    </ContentTransition>
                }

            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: require(`../../locales/${locale}.json`)
        }
    }
};

export default ActivityPage;
