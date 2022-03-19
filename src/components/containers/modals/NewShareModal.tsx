import {Node} from "../../../helper/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import {useTranslations} from "use-intl";
import React, {ChangeEvent, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";

interface Props {
    node: Node;
    closeCallback: () => void;
}

function NewShareModal(props: Props): JSX.Element {

    const t = useTranslations();

    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title="Grant access to new users" className="text-center" />
                    <div className="py-8 px-10 space-y-4">

                        <TextInput type="text" label="Search a user" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(e.currentTarget.value);
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
                            {[0,1,2].map((user, index) => { // TODO fetch and display real users
                                return (
                                    <tr className="border-b border-grey-200" key={index}>
                                        <td className="py-2 px-4">
                                            <div className="flex space-x-6">
                                                <div className="grid h-9 w-9 rounded-full bg-silver my-auto -mr-3">
                                                    <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                                                </div>
                                                <div className="grid content-center leading-4">
                                                    <span className="text-txt-heading font-semibold text-2xs">John Doe</span>
                                                    <span className="text-txt-body-muted font-light text-4xs">Legal department, Lawyer</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-txt-body">
                                                <Button size="medium" type="regular" colour="green" onClick={(e) => {
                                                    // TODO Share with user
                                                    e.currentTarget.innerText = "Shared";
                                                    e.currentTarget.disabled = true;
                                                }}>
                                                    Grant access
                                                </Button>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        <div className="text-center mt-4">
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewShareModal;
