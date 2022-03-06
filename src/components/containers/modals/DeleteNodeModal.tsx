import {Node} from "../../../helper/processes";
import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import {capitalize} from "../../../util/string";
import {useTranslations} from "use-intl";

interface Props {
    node: Node;
    submitCallback: () => void;
    closeCallback: () => void;
}

function DeleteNodeModal(props: Props): JSX.Element {

    const t = useTranslations();

    return (
        <>
            <div className="z-10 fixed left-0 top-0 w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" onClick={props.closeCallback} />
            <div className="z-20 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title={t.rich("modal.node.delete.title", {type: t(`generic.node.${props.node.type.toLowerCase()}`)}).toString()} className="text-center" />
                    <div className="py-8 px-20">
                        <p className="text-txt text-center">
                            {t.rich("modal.node.delete.description", {
                                bold: (children) => <span className="font-semibold">&quot;{children}&quot;</span>,
                                name: props.node.metaData.name
                            })}
                            <br/>
                            {t("generic.irreversible")}
                        </p>
                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="red" onClick={() => {
                                props.submitCallback();
                                props.closeCallback();
                            }}>{t("modal.node.delete.submit")}</Button>
                            <Button size="medium" type="regular" colour="dark" onClick={props.closeCallback}>{t("generic.action.cancel")}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteNodeModal;
