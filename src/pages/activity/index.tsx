import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import React, {useEffect, useState} from "react";
import {GetStaticProps} from "next";
import EmptyActivities from "../../components/sections/EmptyActivities";
import {useRouter} from "next/router";
import Badge from "../../components/Badge";
import User from "../../model/User";
import {decryptFileSystem, EncryptedNode, Node} from "../../helper/processes";
import {request} from "../../helper/communication";
import getConfig from "next/config";
import {useTranslations} from "use-intl";
import Log, {ActivityType} from "../../model/Log";
import NodeUploadActivity from "../../components/activities/NodeUploadActivity";
import FileSharingActivity from "../../components/activities/FileSharingActivity";
import FileOverwriteActivity from "../../components/activities/FileOverwriteActivity";
import NodeMovingActivity from "../../components/activities/NodeMovingActivity";
import FileDownloadActivity from "../../components/activities/FileDownloadActivity";
import NodeDeletionActivity from "../../components/activities/NodeDeletionActivity";

function ActivityPage(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const t = useTranslations();
    const router = useRouter();

    const [node, setNode] = useState<Node | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userLogs, setUserLogs] = useState<Log[]>([]);
    const [nodeLogs, setNodeLogs] = useState<Log[]>([]);

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
                    createdAt: rawUser.createdAt,
                    userStatus: rawUser.userStatus,
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

        // Fetch user logs
        const userLogsResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/logs/user-logs`, {});
        const userLogs = userLogsResponse.data.logs;
        setUserLogs(userLogs);

        // Fetch node logs
        const nodeLogsResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/logs/node-logs`, {});
        const nodeLogs = nodeLogsResponse.data.logs;
        setNodeLogs(nodeLogs);

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

                {loaded && <>
                    {(!userLogs && !nodeLogs) ?
                        <EmptyActivities />
                        :
                        <div className="pt-4 px-6 space-y-6 mb-2">
                            {userLogs.concat(nodeLogs)
                                .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                                .map((activity, index) => {

                                    let node: Node | null;
                                    let oldParent: Node | null;
                                    let newParent: Node | null;

                                    switch (activity.activityType) {

                                        /*
                                        // user
                                        case ActivityType.USER_CREATION:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);
                                        case ActivityType.USER_REGISTRATION:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);
                                        case ActivityType.USER_LOGIN:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);
                                        case ActivityType.USER_UPDATE:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);
                                        case ActivityType.USER_DELETION:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);
                                        case ActivityType.USER_VALIDATION:
                                            return (<UserCreationActivity
                                                key={index}
                                                user={activity.subject}
                                            />);*/

                                        // node activities
                                        case ActivityType.FILE_DELETION:
                                        case ActivityType.FOLDER_DELETION:
                                            node = decryptFileSystem(activity.node, 0);
                                            if (node)
                                                return (<NodeDeletionActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                />);
                                            break;

                                        case ActivityType.FILE_DOWNLOAD:
                                            node = decryptFileSystem(activity.node, 0);
                                            if (node)
                                                return (<FileDownloadActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                />);
                                            break;

                                        case ActivityType.FILE_MOVING:
                                        case ActivityType.FOLDER_MOVING:
                                            node = decryptFileSystem(activity.node, 0);
                                            oldParent = decryptFileSystem(activity.oldParent, 0);
                                            newParent = decryptFileSystem(activity.newParent, 0);
                                            if (!!node && !!oldParent && !!newParent) {
                                                return (<NodeMovingActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                    oldParent={oldParent}
                                                    newParent={newParent}
                                                />);
                                            }
                                            break;

                                        case ActivityType.FILE_OVERWRITE:
                                            node = decryptFileSystem(activity.node, 0);
                                            if (node) {
                                                return (<FileOverwriteActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                />);
                                            }
                                            break;

                                        case ActivityType.FILE_SHARING:
                                            node = decryptFileSystem(activity.node, 0);
                                            if (node && activity.sharedWith) {
                                                return (<FileSharingActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                    recipient={activity.sharedWith}
                                                />);
                                            }
                                            break;

                                        case ActivityType.FILE_UPLOAD:
                                        case ActivityType.FOLDER_CREATION:
                                            node = decryptFileSystem(activity.node, 0);
                                            if (node)
                                                return (<NodeUploadActivity
                                                    key={index}
                                                    activity={{user: activity.curUser, timestamp: activity.timestamp}}
                                                    node={node}
                                                />);
                                            break;
                                    }
                                })
                            }
                        </div>
                    }
                    </>
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
