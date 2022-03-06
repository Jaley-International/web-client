import {Node} from "../../../helper/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import {useRef, useState} from "react";
import {useTranslations} from "use-intl";

interface Props {
    node: Node;
    submitCallback: (files: File | null) => void;
    closeCallback: () => void;
}

function OverwriteFileModal(props: Props): JSX.Element {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const t = useTranslations();

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={t("modal.node.overwrite.title")} className="text-center" />
                    <div className="py-8 px-20">
                        <p className="text-txt text-center">
                            {t.rich("modal.node.overwrite.description", {
                                bold: (children) => <span className="font-semibold">&quot;{children}&quot;</span>,
                                name: props.node.metaData.name
                            })}
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
                                 props.closeCallback();
                                 props.submitCallback(e.dataTransfer.files[0]);
                             }}
                        >
                            <p className="mb-3 font-semibold text-txt-body-muted flex flex-wrap justify-center">
                                <span>{t("modal.node.overwrite.drag-n-drop")}</span>
                            </p>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={_ => {
                                if (fileInputRef.current && fileInputRef.current.files) {
                                    props.closeCallback();
                                    props.submitCallback(fileInputRef.current.files.item(0));
                                }
                            }} />
                            <Button size="medium" type="soft" colour="blue" onClick={() => {
                                if (fileInputRef.current !== null)
                                    fileInputRef.current.click();
                            }}>{t("modal.node.overwrite.submit")}</Button>
                        </div>

                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>{t("generic.action.cancel")}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OverwriteFileModal;
