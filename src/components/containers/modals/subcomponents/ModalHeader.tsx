import Button from "../../../buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface Props {
    title: string;
    className?: string;
    closeCallback?: () => void;
}

function ModalHeader(props: Props): JSX.Element {
    return (
        <div className={`w-full py-5 px-7 border-b border-grey-200 flex ${props.className}`}>
            <span className="font-semibold text-2lg w-full">{props.title}</span>
            {props.closeCallback &&
                <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-grey-75 hover:bg-grey-75 hover:text-txt-body active:bg-grey-75 active:text-txt-body" onClick={props.closeCallback}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            }
        </div>
    );
}

export default ModalHeader;
