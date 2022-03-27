import {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {FileTransferInterface, FileTransferProps} from "./FileTransferProvider";
import {createPortal} from "react-dom";
import {useFileTransferPortal} from "../../hooks/useFileTransferPortal";
import TransferList from "./TransferList";
import {randomString} from "../../util/string";

const FileTransferPortal = forwardRef((props, ref: Ref<FileTransferInterface>) => {

    const [transfers, setTransfers] = useState<FileTransferProps[]>([]);
    const {loaded, portalId} = useFileTransferPortal();


    useImperativeHandle(ref, () => ({
        add(transfer: FileTransferProps) {
            transfer.id = randomString(8);
            const newTransfers = transfers.concat(transfer);
            setTransfers(newTransfers);
            return transfer;
        },
        remove(transfer: FileTransferProps) {
            if (!transfer.id) return;
            const newTransfers = transfers.filter(t => t.id === transfer.id);
            setTransfers(newTransfers);
        },
        update(transfer: FileTransferProps) {
            if (!transfer.id) return;
            const newTransfers = transfers.map(t => {
                if (t.id === transfer.id)
                    return transfer;
                else
                    return t;
            });
        }
    }));

    return loaded ? (
        createPortal(
            <TransferList transfers={transfers} />,
            document.getElementById(portalId) as Element
        )
    ) : (
        <></>
    );

});

FileTransferPortal.displayName = "FileTransferPortal";
export default FileTransferPortal;
