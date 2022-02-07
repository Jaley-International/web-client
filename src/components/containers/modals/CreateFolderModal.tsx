import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import TextInput from "../../inputs/TextInput";
import {useRef} from "react";

interface Props {
    closeCallback: () => void;
    submitCallback: (name:string) => void;
}

function CreateFolderModal(props: Props): JSX.Element {

    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="z-10 absolute w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title="Create folder" className="text-center" />
                    <div className="py-8 px-20">

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (nameRef.current) {
                                const name = nameRef.current.value;
                                props.submitCallback(name);
                            }
                            props.closeCallback();
                        }}>
                            <TextInput ref={nameRef} type="text" label="Folder name" name="folder-name" required={true} validator={(str: string) => /^[0-9a-zA-Z-_àéèêëîïÀÉÈÊËÎÏçÇ ]{1,32}$/.test(str)} />

                            <div className="pt-8 text-center space-x-4">
                                <Button size="medium" type="regular" colour="green" action="submit">Create folder</Button>
                                <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateFolderModal;
