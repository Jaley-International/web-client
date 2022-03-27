import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {FileTransferInterface, FileTransferProps} from "./FileTransferProvider";
import {createPortal} from "react-dom";
import {useFileTransferPortal} from "../../hooks/useFileTransferPortal";
import TransferList from "./TransferList";

const FileTransferPortal = forwardRef((props, ref: Ref<FileTransferInterface>) => {

    // TODO use real transfers
    const [transfers, setTransfers] = useState<FileTransferProps[]>([]);
    const {loaded, portalId} = useFileTransferPortal();

    // TODO Implement functions
    useImperativeHandle(ref, () => ({
        add(transfer: FileTransferProps) {
            return 0;
        },
        remove(id: number) {
            return;
        },
        update(id: number, transfer: FileTransferProps) {
            return;
        }
    }));

    return loaded ? (
        createPortal(
            <TransferList />,
            document.getElementById(portalId) as Element
        )
    ) : (
        <></>
    );

});

FileTransferPortal.displayName = "FileTransferPortal";
export default FileTransferPortal;
