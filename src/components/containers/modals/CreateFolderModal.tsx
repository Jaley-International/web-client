import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";
import {useRef} from "react";
import {useTranslations} from "use-intl";

interface Props {
    closeCallback: () => void;
    submitCallback: (name:string) => void;
}

function CreateFolderModal(props: Props): JSX.Element {

    const t = useTranslations();

    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={t("modal.node.create-folder.title")} className="text-center" />
                    <div className="py-8 px-20">

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (nameRef.current) {
                                const name = nameRef.current.value;
                                props.submitCallback(name);
                            }
                            props.closeCallback();
                        }}>
                            <TextInput ref={nameRef} type="text" label={t("modal.node.create-folder.folder-name")} name="folder-name" autoFocus={true} required={true} validator={(str: string) => /^[0-9a-zA-Z-_àéèêëîïÀÉÈÊËÎÏçÇ ]{1,32}$/.test(str)} />

                            <div className="pt-8 text-center space-x-4">
                                <Button size="medium" type="regular" colour="green" action="submit">{t("modal.node.create-folder.submit")}</Button>
                                <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>{t("generic.action.cancel")}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateFolderModal;
