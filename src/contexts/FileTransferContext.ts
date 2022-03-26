import {createContext} from "react";
import {FileTransferInterface, FileTransferProps} from "../components/transfers/FileTransferProvider";

const FileTransferContext = createContext<FileTransferInterface>({
    add(_: FileTransferProps): number {
        return 0;
    }, remove(_: number): void {
    }, update(_: number, __: FileTransferProps): void {
    }
});

export default FileTransferContext;
