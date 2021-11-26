import BreadcrumbItem, {BreadcrumbItemProps} from "./BreadcrumbItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
    items: BreadcrumbItemProps[];
}

function Breadcrumb(props: Props): JSX.Element {
    return (
        <nav className="space-x-4">
            {props.items.map((item) =>
                <BreadcrumbItem {...item} />
            ).reduce((prev, curr) => <>
                {prev}
                <FontAwesomeIcon icon={faChevronRight} className="text-grey-700" />
                {curr}
            </>)}
        </nav>
    );
}

export default Breadcrumb;