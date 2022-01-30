import {Coords} from "../../buttons/OptionsButton";

interface Props {
    children: JSX.Element[];
    coords: Coords;
}

function ContextMenu(props: Props): JSX.Element {
    // FIXME Use portal to avoid context menu from being cut out from container
    return (
        <div className="context z-20 absolute transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-card rounded-lg" style={{top: props.coords.y + "px", left: props.coords.x + "px"}}>
            <>
                {props.children}
            </>
        </div>
    );
}

export default ContextMenu;
