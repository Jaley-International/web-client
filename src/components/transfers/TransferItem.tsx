import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faArrowCircleUp, faArrowCircleDown} from "@fortawesome/free-solid-svg-icons";
import Button from "../buttons/Button";
import ProgressBar from "../ProgressBar";
import {FileTransferProps} from "./FileTransferProvider";
import {capitalize} from "../../util/string";

interface Props {
    transfer: FileTransferProps;
}

const colorsFromStatus = {
    "SENDING": "blue",
    "RECEIVING": "blue",
    "ENCRYPTING": "orange",
    "DECRYPTING": "green",
    "ERRORED": "red",
    "PAUSED": "silver",
};

function TransferItem(props: Props): JSX.Element {
    // TODO : Make responsiveness
    return (
        <div className="flex h-12 border-b border-grey-200">
            <div className="w-full px-3 py-2 space-y-1">
                <div className="space-x-1 text-2xs flex">
                    <div className="w-4">
                        <FontAwesomeIcon icon={props.transfer.type === "UPLOAD" ? faArrowCircleUp : faArrowCircleDown} className="text-txt-heading text-sm" />
                    </div>
                    <div className="w-4/12">
                        <span className="pl-1 font-semibold text-txt-heading">{props.transfer.filename}</span>
                    </div>
                    <div className="w-7/12">
                        <span className="pl-5 font-light text-txt-body-muted">{props.transfer.path}</span>
                    </div>
                </div>
                <div className="flex space-x-3 text-3xs font-medium">
                    <div className="w-8/12 my-auto">
                        <ProgressBar value={props.transfer.progress} colour={colorsFromStatus[props.transfer.status]} size={1.5} />
                    </div>
                    <div className="w-1/12">
                        <span className="text-txt-body-muted">{props.transfer.progress}%</span>
                    </div>
                    <div className="w-2/12">
                        <span className="text-txt-body-muted">{capitalize(props.transfer.status)}...</span>
                    </div>
                </div>
            </div>
            <div className="m-auto h-full">
                <Button size="medium" type="soft" colour="dark" className="rounded-b-none rounded-t-none h-full pl-3 pr-3 text-txt-body-muted bg-bg-light hover:bg-grey-75 active:bg-grey-75">
                    <FontAwesomeIcon icon={faEllipsisV} className="text-2xs" />
                </Button>
            </div>
        </div>
    );
}

export default TransferItem;
