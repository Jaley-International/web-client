import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export interface BreadcrumbItemProps {
    title?: string;
    icon?: IconProp
    action?: () => void;
    onDrop?: () => void;
}

function BreadcrumbItem(props: BreadcrumbItemProps): JSX.Element {

    const [dragging, setDragging] = useState<boolean>(false);

    return (
        <span className={`${props.action ? "text-blue-light cursor-pointer" : "cursor-default text-grey-800"} ${dragging ? "border-2 border-blue border-dashed px-1.5" : ""} px-2 font-semibold`}
              onClick={props.action}
              onDragOver={(e) => {
                  e.preventDefault();
                  if (props.onDrop)
                      setDragging(true);
              }}
              onDragLeave={() => {
                  if (props.onDrop)
                      setDragging(false);
              }}
              onDrop={(e) => {
                  e.preventDefault();
                  if (props.onDrop)
                      props.onDrop();
              }}
        >
            {props.icon &&
                <FontAwesomeIcon icon={props.icon} />
            }
            {props.title && props.title}
        </span>
    );
}

export default BreadcrumbItem;
