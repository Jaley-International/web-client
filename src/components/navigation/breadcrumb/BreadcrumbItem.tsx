import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface BreadcrumbItemProps {
    title?: string;
    icon?: IconProp
    href?: string;
    action?: () => void;
}

function BreadcrumbItem(props: BreadcrumbItemProps): JSX.Element {
    return (
        <>
            {props.href
                    ?   <Link href={props.href} passHref={true}>
                            <a className="text-blue-light font-semibold space-x-2" onClick={props.action}>
                                {props.icon &&
                                    <FontAwesomeIcon icon={props.icon} />
                                }
                                {props.title && props.title}
                            </a>
                        </Link>
                    : <span className={`${props.action ? "text-blue-light cursor-pointer" : "cursor-default text-grey-800"} font-semibold`} onClick={props.action}>
                        {props.icon &&
                            <FontAwesomeIcon icon={props.icon} />
                        }
                        {props.title && props.title}
                    </span>
            }
        </>
    );
}

export default BreadcrumbItem;
