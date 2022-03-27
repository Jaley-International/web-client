import FileTransferContext from "contexts/FileTransferContext";
import {useRef} from "react";
import FileTransferPortal from "./FileTransferPortal";

export interface FileTransferProps {
    id?: string;
    type: "UPLOAD" | "DOWNLOAD";
    filename: string;
    path: string;
    status: "SENDING" | "RECEIVING" | "ENCRYPTING" | "DECRYPTING" | "ERRORED" | "PAUSED";
    progress: number;
}

export interface FileTransferInterface {
    add: (transfer: FileTransferProps) => FileTransferProps | null;
    remove: (transfer: FileTransferProps) => void;
    update: (transfer: FileTransferProps) => void;
}

interface Props {
    children: JSX.Element;
}

function FileTransferProvider(props: Props): JSX.Element {

    const fileTransferRef = useRef<FileTransferInterface>(null);

    const fileTransferInterface: FileTransferInterface = {
        add: (transfer: FileTransferProps): FileTransferProps | null => {
            if (fileTransferRef.current)
                return fileTransferRef.current.add(transfer);
            return null;
        },
        remove: (transfer: FileTransferProps): void => {
            if (fileTransferRef.current)
                fileTransferRef.current.remove(transfer);
        },
        update: (transfer: FileTransferProps): void => {
            if (fileTransferRef.current)
                fileTransferRef.current.update(transfer);
        }
    }

    return (
        <FileTransferContext.Provider value={fileTransferInterface}>
            <>
                {props.children}
                <FileTransferPortal ref={fileTransferRef} />
            </>
        </FileTransferContext.Provider>
    );
}

export default FileTransferProvider;
