import {createContext} from "react";
import {FileTransferInterface, FileTransferProps} from "../components/transfers/FileTransferProvider";

const FileTransferContext = createContext<FileTransferInterface>({
    add(_: FileTransferProps): FileTransferProps | null {
        return null;
    }, remove(_: FileTransferProps): void {
    }, update(_: FileTransferProps): void {
    }
});

export default FileTransferContext;
