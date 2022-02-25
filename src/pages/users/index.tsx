import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import {faPlus, faUser, faUserFriends, faIdCardAlt} from "@fortawesome/free-solid-svg-icons";
import {faEye, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import Card from "../../components/containers/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../components/buttons/Button";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import DeleteUserModal from "../../components/containers/modals/DeleteUserModal";
import User, {UserAccessLevel} from "../../model/User";
import OptionsButton from "../../components/buttons/OptionsButton";
import ContextMenuItem from "../../components/containers/contextmenu/ContextMenuItem";
import {request} from "../../helper/communication";
import {deleteAccount} from "../../helper/processes";
import getConfig from "next/config";
import Badge from "../../components/Badge";
import {capitalize} from "../../util/string";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import {GetStaticProps} from "next";
import {useTranslations} from "use-intl";

function UserList(): JSX.Element {
    const {publicRuntimeConfig} = getConfig();

    const addToast = useContext(ToastContext);

    const t = useTranslations();

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [modalUserTarget, setModalUserTarget] = useState<User | null>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchUsers = async () => {
        const usersListResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/users`, {});
        const users = usersListResponse.data.users;
        setUsers(users);
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchUsers().then(_ => {});
    });

    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title={t("pages.user.list.title")}>
                    <Link href="/users/new" passHref>
                        <Button size="small" type="regular" colour="green">
                            <span><FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp;{t("pages.user.list.new-user")}</span>
                        </Button>
                    </Link>
                </Header>

                <ContentTransition className="w-full p-8">
                    <Card title={t("pages.user.list.sub-title")} className="pb-2">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                <th className="w-4/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faUser}/>
                                    <span>{t("generic.user.name")}</span>
                                </th>
                                <th className="w-3/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faUserFriends}/>
                                    <span>{t("generic.user.group")}</span>
                                </th>
                                <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faIdCardAlt}/>
                                    <span>{t("generic.user.account-type")}</span>
                                </th>
                                <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <span>{t("generic.table.actions")}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="overflow-y-scroll h-4/6">

                            {users
                                .sort((a, b) => a.group > b.group ? 1 : (b.group < a.group ? -1 : 0))
                                .sort((a, b) => a.accessLevel > b.accessLevel ? 1 : (b.accessLevel < a.accessLevel ? -1 : 0))
                                .map((user: User) => {
                                return (
                                    <tr className="border-b border-grey-200" key={user.username}>
                                        <td className="py-2 px-4">
                                            <Link href={`/users/${user.username}`} passHref>
                                                <div className="flex space-x-6 cursor-pointer">
                                                    {user.profilePicture ?
                                                        <div
                                                            className="bg-cover bg-center w-9 h-9 rounded-full -mr-3"
                                                            style={{backgroundImage: `url(${user.profilePicture})`}}/>
                                                        :
                                                        <div
                                                            className="grid h-9 w-9 rounded-full bg-silver my-auto -mr-3">
                                                            <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                                                        </div>
                                                    }
                                                    <div className="grid content-center leading-4">
                                                        <span className="text-txt-heading font-semibold text-2xs">{user.firstName} {user.lastName}</span>
                                                        <span className="text-txt-body-muted font-light text-4xs">{user.job}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-2 px-4">
                                            <span className="text-txt-body text-xs">{user.group}</span>
                                        </td>
                                        <td className="py-2 px-4">
                                            <Badge text={capitalize(user.accessLevel)} size="small" colour={user.accessLevel === UserAccessLevel.ADMINISTRATOR ? "orange" : (user.accessLevel === UserAccessLevel.USER ? "green" : "blue")} />
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="w-full">
                                                <OptionsButton>
                                                    <ContextMenuItem name={t("generic.button.view-edit")} icon={faEye}
                                                                     href={`/users/${user.username}`}/>
                                                    <ContextMenuItem name={t("generic.button.delete")} icon={faTimesCircle}
                                                                     action={() => {
                                                                         setModalUserTarget(user);
                                                                         setShowDeleteModal(true);
                                                                     }}/>
                                                </OptionsButton>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </Card>
                </ContentTransition>

            </div>
            {showDeleteModal && modalUserTarget !== null &&
                <DeleteUserModal
                    user={modalUserTarget}

                    submitCallback={async () => {
                        const statusCode = await deleteAccount(modalUserTarget?.username);
                        if (statusCode === "SUCCESS") {
                            await fetchUsers();
                            addToast({
                                type: "success",
                                title: t("pages.user.list.toast.success.title"),
                                message: t("pages.user.list.toast.success.message")
                            });
                        } else if (statusCode === "ERROR_USER_NOT_FOUND") {
                            addToast({
                                type: "error",
                                title: t("pages.user.list.toast.not-found.title"),
                                message: t("pages.user.list.toast.not-found.message")
                            });
                        } else {
                            addToast({
                                type: "error",
                                title: t("pages.user.list.toast.error.title"),
                                message: t("pages.user.list.toast.error.message")
                            });
                        }
                    }}

                    closeCallback={() => {
                        setShowDeleteModal(false);
                        setModalUserTarget(null);
                    }}
                />
            }
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

export default UserList;
