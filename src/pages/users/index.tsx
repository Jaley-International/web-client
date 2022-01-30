import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import {faPlus, faUser, faUserFriends, faIdCardAlt} from "@fortawesome/free-solid-svg-icons";
import {faEye, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import Card from "../../components/containers/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../../components/buttons/Button";
import Link from "next/link";
import {useState} from "react";
import DeleteUserModal from "../../components/containers/modals/DeleteUserModal";
import User from "../../model/User";
import OptionsButton from "../../components/buttons/OptionsButton";
import ContextMenuItem from "../../components/containers/contextmenu/ContextMenuItem";

function UserList(): JSX.Element {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [modalUserTarget, setModalUserTarget] = useState<User | null>(null);

    return (
        <div className="flex">
            <Navbar />
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="User management">
                    <Link href="/users/new">
                        <Button size="small" type="regular" colour="green">
                                <span><FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;New user</span>
                        </Button>
                    </Link>
                </Header>

                <div className="w-full p-8">
                    <Card title="Users" className="pb-2">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                <th className="w-4/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Name</span>
                                </th>
                                <th className="w-3/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faUserFriends} />
                                    <span>Group</span>
                                </th>
                                <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <FontAwesomeIcon icon={faIdCardAlt} />
                                    <span>Account type</span>
                                </th>
                                <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                    <span>Actions</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="overflow-y-scroll h-4/6">
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/123">
                                        <div className="flex space-x-6 cursor-pointer">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Alicia Sanders</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">CEO</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">All</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Administrator</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/123" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(123, "asanders", "Alicia", "Sanders"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/456">
                                        <div className="flex space-x-6 cursor-pointer">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Eva McRoberts</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">HR director</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Human resources</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Administrator</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/456" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(456, "emcroberts", "Eva", "McRoberts"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/789">
                                        <div className="flex space-x-6 cursor-pointer">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Charles Barnett</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">Individuals Litigation Collection Officer</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Debt recovery department</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">User</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/789" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(789, "cbarnett", "Charles", "Barnett"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/321">
                                        <div className="flex space-x-6 cursor-pointer">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Eve Hill</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">Debt Collection Officer</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Debt recovery department</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">User</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/321" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(321, "ehill", "Eve", "Hill"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/654">
                                        <div className="flex space-x-6 cursor-pointer">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Joshua Charlton</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">Legal expert / Lawyer</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Legal department</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">User</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/654" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(654, "jcharlton", "Joshua", "Charlton"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-grey-200">
                                <td className="py-2 px-4">
                                    <Link href="/users/987">
                                        <div className="flex space-x-3 cursor-pointer">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Nathan Cook</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">Business owner</span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Clients</span>
                                </td>
                                <td className="py-2 px-4">
                                    <span className="text-txt-body text-xs">Guest</span>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="w-full">
                                        <OptionsButton>
                                            <ContextMenuItem name="View/Edit" icon={faEye} href="/users/987" />
                                            <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                setModalUserTarget(new User(987, "ncook", "Nathan", "Cook"));
                                                setShowDeleteModal(true);
                                            }} />
                                        </OptionsButton>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>

            </div>
                {showDeleteModal && modalUserTarget !== null &&
                    <DeleteUserModal user={modalUserTarget} closeCallback={() => {
                        setShowDeleteModal(false);
                        setModalUserTarget(null);
                    }
                } />
            }
        </div>
    );
}

export default UserList;
