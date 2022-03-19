import ModalHeader from "./subcomponents/ModalHeader";
import {Node} from "../../../helper/processes";
import {useTranslations} from "use-intl";
import LinkSharing from "../../sections/sharing/LinkSharing";
import Tabs from "../Tabs";
import InternalSharing from "../../sections/sharing/InternalSharing";

interface Props {
    node: Node;
    closeCallback: () => void;
}

function ShareModal(props: Props): JSX.Element {

    const t = useTranslations();

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={t("modal.node.share.title")} className="text-center" />

                    <div className="px-10 py-8">
                        <Tabs tabs={[
                            {name: "Internal sharing", child: <InternalSharing node={props.node} closeCallback={props.closeCallback} />},
                            {name: "Link sharing", child: <LinkSharing node={props.node} closeCallback={props.closeCallback} />}
                        ]} />
                    </div>

                </div>
            </div>
        </>
    );
}

export default ShareModal;
