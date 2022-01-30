import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Badge from "../../Badge";
import Link from "next/link";

interface Props {
    name: string;
    icon: IconProp
    href?: string;
    action?: () => void;
    active?: boolean;
    badge?: string;
    className?: string;
}

function NavbarItem(props: Props): JSX.Element {
    return (
        <Link href={props.href ? props.href : "#"}>
            <div className={`flex space-x-2 lg:space-x-4 py-3 my-1 cursor-pointer ${props.className}`} onClick={props.action}>
                <div className={`w-0.75 h-5 my-auto min-h-max mr-0 lg:mr-1 ${props.active ? "bg-blue" : ""}`} />
                <div className="w-full text-center pr-2 lg:w-4 lg:text-left lg:pr-0">
                    <span className="relative inline-block">
                        <FontAwesomeIcon className="my-auto text-grey-500" icon={props.icon} />
                        {props.badge &&
                            <span className="xl:hidden absolute top-0.5 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-blue-light rounded-full" />
                        }
                    </span>
                </div>
                <span className={`hidden lg:flex pl-1 font-semibold my-auto text-xs ${props.active ? "text-blue" : "text-txt-heading"}`}>{props.name}</span>
                {props.badge &&
                    <div className="hidden xl:block w-full text-right pr-4">
                        <Badge text={props.badge} size="small" colour="blue" className="rounded-lg" />
                    </div>
                }
            </div>
        </Link>
    );
}

export default NavbarItem;
