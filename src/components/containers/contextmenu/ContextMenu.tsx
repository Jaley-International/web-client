import {Coords} from "../../buttons/OptionsButton";
import {useRef} from "react";

interface Props {
    children: JSX.Element[];
    coords: Coords;
}

function ContextMenu(props: Props): JSX.Element {
    // FIXME Use portal to avoid context menu from being cut out from container

    const divRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={divRef} className="context z-20 fixed transform -translate-x-full bg-white shadow-card rounded-lg"
             style={{top: props.coords.y + "px", left: props.coords.x + "px"}}>
            <>
                {props.children}
            </>
        </div>
    );
}

export default ContextMenu;
