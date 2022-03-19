import {Node} from "../../../helper/processes";
import {useTranslations} from "use-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle, faUser} from "@fortawesome/free-regular-svg-icons";
import React, {useEffect, useState} from "react";
import Button from "../../buttons/Button";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewShareModal from "../../containers/modals/NewShareModal";
import {request} from "../../../helper/communication";
import getConfig from "next/config";
import Share from "../../../model/Share";
import {ToastProps} from "../../toast/Toast";

interface Props {
    node: Node;
    addToast: (toast: ToastProps) => void;
}

function InternalSharing(props: Props): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const t = useTranslations();

    const [showNewShareModal, setShowNewShareModal] = useState<boolean>(false);

    const [shares, setShares] = useState<Share[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchShares = async () => {
        const sharesListResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${props.node.id}/shares`, {});
        const shares = sharesListResponse.data.shares;
        setShares(shares);
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchShares().then(_ => {});
    });

    return (
        <>
            <table className="w-full">
                <thead>
                <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                    <th className="w-3/6 sticky top-0 font-semibold text-left px-6 py-4 space-x-3">
                        <FontAwesomeIcon icon={faUser}/>
                        <span>{t("generic.file.shared-with")}</span>
                        <Button size="small" type="soft" colour="green" className="absolute right-0" onClick={() => {
                            setShowNewShareModal(true);
                        }}>
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
                {shares.map((share, index) => {
                    return (
                        <tr className="border-b border-grey-200" key={index}>
                            <td className="py-2 px-4">
                                <div className="flex space-x-6">
                                    <div className="grid h-9 w-9 rounded-full bg-silver my-auto -mr-3">
                                        <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                                    </div>
                                    <div className="grid content-center leading-4">
                                        <span className="text-txt-heading font-semibold text-2xs">{share.recipient.firstName} {share.recipient.lastName}</span>
                                        <span className="text-txt-body-muted font-light text-4xs">{share.recipient.group}, {share.recipient.job}</span>
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
                                    <FontAwesomeIcon className="m-auto text-red-light" icon={faTimesCircle}/>
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
            {showNewShareModal &&
                <NewShareModal node={props.node} closeCallback={() => setShowNewShareModal(false)} addToast={props.addToast} updateCallback={() => fetchShares()} />
            }
        </>
    );
}

export default InternalSharing;
