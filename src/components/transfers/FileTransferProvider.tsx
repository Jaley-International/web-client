import FileTransferContext from "contexts/FileTransferContext";
import {useRef} from "react";
import FileTransferPortal from "./FileTransferPortal";

export interface FileTransferProps {
    type: "upload" | "download";
    filename: string;
    path: string;
    status: "Sending" | "Receiving" | "Encrypting" | "Decrypting" | "Errored" | "Paused";
    progress: number;
}

export interface FileTransferInterface {
    add: (transfer: FileTransferProps) => number;
    remove: (id: number) => void;
    update: (id: number, transfer: FileTransferProps) => void;
}

interface Props {
    children: JSX.Element;
}

function FileTransferProvider(props: Props): JSX.Element {

    const fileTransferRef = useRef<FileTransferInterface>(null);

    const fileTransferInterface: FileTransferInterface = {
        add: (transfer: FileTransferProps): number => {
            console.log("ADD");
            if (fileTransferRef.current) {
                return fileTransferRef.current.add(transfer);
            }
            return -1;
        },
        remove: (id: number): void => {
            if (fileTransferRef.current) {
                fileTransferRef.current.remove(id);
            }
        },
        update: (id: number, transfer: FileTransferProps): void => {
            if (fileTransferRef.current) {
                fileTransferRef.current.update(id, transfer);
            }
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
