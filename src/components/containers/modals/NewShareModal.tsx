import {Node, shareNode} from "../../../helper/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import {useTranslations} from "use-intl";
import React, {ChangeEvent, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";
import {request} from "../../../helper/communication";
import getConfig from "next/config";
import User, {UserStatus} from "../../../model/User";
import {ToastProps} from "../../toast/Toast";

interface Props {
    node: Node;
    closeCallback: () => void;
    addToast: (toast: ToastProps) => void;
    updateCallback: () => void;
}

function NewShareModal(props: Props): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const t = useTranslations();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchShares = async () => {
        //TODO get users who are not shared with the node
        const usersListResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/users`, {});
        let users: User[] = usersListResponse.data.users;

        // filters out users who already have access to the node
        users = users.filter(user => {

            // checking if user is owner of the node
            if (props.node.owner && user.username === props.node.owner.username) return false;

            // checking if already shared
            for (let share of props.node.shares)
                if (user.username === share.recipient.username)
                    return false;

            // checking if user registered
            return user.userStatus === UserStatus.OK;
        });

        setUsers(users);
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchShares().then(_ => {});
    });


    const [targets, setTargets] = useState<User[]>([]);
    const submitShares = () => {
        targets.forEach(user => shareNode(props.node, user));
    };

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title="Grant access to new users" className="text-center" />
                    <div className="py-8 px-10 space-y-4">

                        <TextInput type="text" label="Search a user" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(e.currentTarget.value.toLowerCase());
                        }} />

                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                <th className="w-3/4 sticky top-0 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faUser}/>
                                    <span>{t("generic.user.title")}</span>
                                </th>
                                <th className="w-1/4 sticky top-0 font-semibold px-6 py-4 space-x-3 text-center">
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            {users
                                .filter(user => {
                                    if (user.username.toLowerCase().includes(searchQuery)) return true;
                                    if (user.firstName.toLowerCase().includes(searchQuery)) return true;
                                    if (user.lastName.toLowerCase().includes(searchQuery)) return true;
                                    if (user.email.toLowerCase().includes(searchQuery)) return true;
                                    if (user.job.toLowerCase().includes(searchQuery)) return true;
                                    return user.group.toLowerCase().includes(searchQuery);
                                })
                                .map((user, index) => {
                                return (
                                    <tr className="border-b border-grey-200" key={index}>
                                        <td className="py-2 px-4">
                                            <div className="flex space-x-6">
                                                <div className="grid h-9 w-9 rounded-full bg-silver my-auto -mr-3">
                                                    <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                                                </div>
                                                <div className="grid content-center leading-4">
                                                    <span className="text-txt-heading font-semibold text-2xs">{user.firstName} {user.lastName}</span>
                                                    <span className="text-txt-body-muted font-light text-4xs">{user.group}, {user.job}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-txt-body">
                                                {targets.includes(user) ?
                                                    <Button size="medium" type="regular" colour="orange" className="w-full" onClick={() => {
                                                        const newTargets = targets.filter(target => target !== user);
                                                        setTargets(newTargets);
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                :
                                                    <Button size="medium" type="regular" colour="green" className="w-full" onClick={() => {
                                                        const newTargets = targets.concat(user);
                                                        setTargets(newTargets);
                                                    }}>
                                                        Grant access
                                                    </Button>
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        <div className="text-center mt-4 space-x-4">
                            <Button size="medium" type="regular" colour="green" onClick={() => {
                                submitShares();
                                props.closeCallback();
                            }}>Submit</Button>
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewShareModal;
