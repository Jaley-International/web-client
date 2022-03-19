import {Node} from "../../../helper/processes";
import {useTranslations} from "use-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle, faUser} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import Button from "../../buttons/Button";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface Props {
    node: Node;
}

function InternalSharing(props: Props): JSX.Element {

    const t = useTranslations();

    return (
        <>
            <table className="w-full">
                <thead>
                <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                    <th className="w-3/6 sticky top-0 font-semibold text-left px-6 py-4 space-x-3">
                        <FontAwesomeIcon icon={faUser}/>
                        <span>{t("generic.file.shared-with")}</span>
                        <Button size="small" type="soft" colour="green" className="absolute right-0">
                            <>
                                <FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp;Add user
                            </>
                        </Button>
                    </th>
                    <th className="w-1/6 sticky top-0 font-semibold px-6 py-4 space-x-3 text-center">
                        <span>Read access</span>
                    </th>
                    <th className="w-1/6 sticky top-0 font-semibold px-6 py-4 space-x-3 text-center">
                        <span>Write access</span>
                    </th>
                    <th className="w-1/6 sticky top-0 font-semibold px-6 py-4 space-x-3 text-center">
                        <span>Share access</span>
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
                            <td className="py-2 px-4 text-center">
                        <span className="text-txt-body">
                            <FontAwesomeIcon className="m-auto text-green" icon={faCheckCircle}/>
                        </span>
                            </td>
                            <td className="py-2 px-4 text-center">
                        <span className="text-txt-body">
                            <FontAwesomeIcon className="m-auto text-green" icon={faCheckCircle}/>
                        </span>
                            </td>
                            <td className="py-2 px-4 text-center">
                        <span className="text-txt-body">
                            <FontAwesomeIcon className="m-auto text-red-light" icon={faTimesCircle}/>
                        </span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}

export default InternalSharing;
