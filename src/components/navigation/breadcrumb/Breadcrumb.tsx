import BreadcrumbItem, {BreadcrumbItemProps} from "./BreadcrumbItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
    items: BreadcrumbItemProps[];
}

function Breadcrumb(props: Props): JSX.Element {
    return (
        <nav className="space-x-2 text-xs lg:space-x-4 lg:text-sm">
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
