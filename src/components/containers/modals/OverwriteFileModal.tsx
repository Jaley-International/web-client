import {Node} from "../../../util/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import {useRef, useState} from "react";

interface Props {
    node: Node;
    submitCallback: (files: File | null) => void;
    closeCallback: () => void;
}

function OverwriteFileModal(props: Props): JSX.Element {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="z-10 absolute w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={`File overwriting`} className="text-center" />
                    <div className="py-8 px-20">
                        <p className="text-txt text-center">
                            You are about to overwrite &quot;<span className="font-semibold">{props.node.metaData.name}</span>&quot;.<br />
                        </p>

                        <div className={`w-full mt-4 p-8 text-center border-4 border-dashed ${isDragging ? " border-blue" : "border-grey-300"}`}
                             onDragOver={(e) => {
                                 e.preventDefault();
                                 setIsDragging(true);
                             }}
                             onDragLeave={() => setIsDragging(false)}
                             onDrop={(e) => {
                                 e.preventDefault();
                                 setIsDragging(false);
                                 props.submitCallback(e.dataTransfer.files[0]);
                             }}
                        >
                            <p className="mb-3 font-semibold text-txt-body-muted flex flex-wrap justify-center">
                                <span>Drag and drop your file here or</span>
                            </p>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => {
                                if (fileInputRef.current && fileInputRef.current.files)
                                    props.submitCallback(fileInputRef.current.files.item(0));
                            }} />
                            <Button size="medium" type="soft" colour="blue" onClick={() => {
                                if (fileInputRef.current !== null)
                                    fileInputRef.current.click();
                            }}>Upload a file</Button>
                        </div>

                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OverwriteFileModal;
