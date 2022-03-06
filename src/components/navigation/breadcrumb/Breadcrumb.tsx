import BreadcrumbItem, {BreadcrumbItemProps} from "./BreadcrumbItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
    items: BreadcrumbItemProps[];
}

function Breadcrumb(props: Props): JSX.Element {
    if (props.items.length === 0) return <></>;
    return (
        <nav className="space-x-2 text-2xs lg:space-x-4 lg:text-xs">
            {props.items.map((item, index) =>
                <BreadcrumbItem key={index} {...item} />
            ).reduce((prev, curr) => <>
                {prev}
                <FontAwesomeIcon icon={faChevronRight} className="text-grey-700" />
                {curr}
            </>)}
        </nav>
    );
}

export default Breadcrumb;
