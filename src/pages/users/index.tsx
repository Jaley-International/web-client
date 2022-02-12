import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import {faPlus, faUser, faUserFriends, faIdCardAlt} from "@fortawesome/free-solid-svg-icons";
import {faEye, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import Card from "../../components/containers/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../components/buttons/Button";
import Link from "next/link";
import {useRef, useState} from "react";
import DeleteUserModal from "../../components/containers/modals/DeleteUserModal";
import User from "../../model/User";
import OptionsButton from "../../components/buttons/OptionsButton";
import ContextMenuItem from "../../components/containers/contextmenu/ContextMenuItem";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {request} from "../../util/communication";
import {deleteAccount} from "../../util/processes";
import ToastPortal, {ToastRef} from "../../components/toast/ToastPortal";
import {ToastProps} from "../../components/toast/Toast";

function UserList({initialUsers, apiUrl}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {

    const toastRef = useRef<ToastRef>(null);
    const addToast = (toast: ToastProps) => {
        toastRef.current?.addMessage(toast)
    };

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [modalUserTarget, setModalUserTarget] = useState<User | null>(null);

    const [users, setUsers] = useState<User[]>(initialUsers);

    const fetchUsers = async () => {
        const usersListResponse = await request("GET", `${apiUrl}/users`, {});
        const users = usersListResponse.data.users;
        setUsers(users);
    };

    return (
        <>
            <div className="flex bg-bg-light">
                <Navbar/>
                <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                    <Header title="User management">
                        <Link href="/users/new" passHref>
                            <Button size="small" type="regular" colour="green">
                                <span><FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp;New user</span>
                            </Button>
                        </Link>
                    </Header>

                    <div className="w-full p-8">
                        <Card title="Users" className="pb-2">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                    <th className="w-4/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faUser}/>
                                        <span>Name</span>
                                    </th>
                                    <th className="w-3/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faUserFriends}/>
                                        <span>Group</span>
                                    </th>
                                    <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faIdCardAlt}/>
                                        <span>Account type</span>
                                    </th>
                                    <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <span>Actions</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="overflow-y-scroll h-4/6">

                                {users.map((user: User) => {
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
                                                                <FontAwesomeIcon className="m-auto text-silver-dark"
                                                                                 icon={faUser}/>
                                                            </div>
                                                        }
                                                        <div className="grid content-center leading-4">
                                                            {/* TODO replace username by first name and last name */}
                                                            <span
                                                                className="text-txt-heading font-semibold text-2xs">{user.username}</span>
                                                            <span
                                                                className="text-txt-body-muted font-light text-4xs">{user.job}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="text-txt-body text-xs">{user.group}</span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="text-txt-body text-xs">{user.accountType}</span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div className="w-full">
                                                    <OptionsButton>
                                                        <ContextMenuItem name="View/Edit" icon={faEye}
                                                                         href={`/users/${user.username}`}/>
                                                        <ContextMenuItem name="Delete" icon={faTimesCircle}
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
                    </div>

                </div>
                {showDeleteModal && modalUserTarget !== null &&
                    <DeleteUserModal
                        user={modalUserTarget}

                        submitCallback={async () => {
                            const statusCode = await deleteAccount(modalUserTarget?.username, apiUrl);
                            if (statusCode === "SUCCESS") {
                                await fetchUsers();
                                addToast({
                                    type: "success",
                                    title: "User deleted",
                                    message: "Account successfully deleted"
                                });
                            } else if (statusCode === "ERROR_USER_NOT_FOUND") {
                                addToast({
                                    type: "error",
                                    title: "Failed to delete a user",
                                    message: "Account to delete was not found."
                                });
                            } else {
                                addToast({
                                    type: "error",
                                    title: "Failed to delete a user",
                                    message: "An unknown error occurred while deleting an account."
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
            <ToastPortal ref={toastRef}/>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const usersListResponse = await request("GET", `${process.env.PEC_CLIENT_API_URL}/users`, {});
    const users = usersListResponse.data.users;
    return {
        props: {
            initialUsers: users,
            apiUrl: process.env.PEC_CLIENT_API_URL,
        }
    };
};

export default UserList;
