import Link from "next/link";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    name: string;
    icon?: IconProp
    action?: () => void;
    href?: string;
}

function ContextMenuItem(props: Props): JSX.Element {
    return (
        <Link href={props.href ? props.href : "#"} passHref>
            <div className="context flex w-max text-xs hover:bg-grey-100 py-1.5 px-6 cursor-pointer transition duration-100" onClick={props.action ? props.action : () => {}}>
                {props.icon &&
                    <span className="w-6 text-center mr-2.5">
                        <FontAwesomeIcon icon={props.icon}/>
                    </span>
                }
                <span className="text-txt-body my-auto">
                    {props.name}
                </span>
            </div>
        </Link>
    );
}

export default ContextMenuItem;
