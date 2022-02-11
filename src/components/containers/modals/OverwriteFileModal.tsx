import {Node} from "../../../util/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import FileDropArea from "../../inputs/FileDropArea";

interface Props {
    node: Node;
    closeCallback: () => void;
}

function OverwriteFileModal(props: Props): JSX.Element {
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
                        <form className="pt-10">
                            <FileDropArea />
                        </form>
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
