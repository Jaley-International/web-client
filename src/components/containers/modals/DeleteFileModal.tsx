import {Node} from "../../../util/security";
import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";

interface Props {
    node: Node;
    submitCallback: () => void;
    closeCallback: () => void;
}

function DeleteFileModal(props: Props): JSX.Element {
    return (
        <>
            <div className="z-10 absolute w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={`File deletion confirmation`} className="text-center" />
                    <div className="py-8 px-20">
                        <p className="text-txt text-center">
                            Are you sure you want to delete &quot;<span className="font-semibold">{props.node.metaData.name}</span>&quot; ?<br />
                            This process cannot be reversed.
                        </p>
                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="red" onClick={() => {
                                props.submitCallback();
                                props.closeCallback();
                            }}>Confirm deletion</Button>
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteFileModal;
