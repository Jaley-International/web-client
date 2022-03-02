import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import {useEffect, useRef, useState} from "react";
import ContextMenu from "../containers/contextmenu/ContextMenu";

interface Props {
    children: JSX.Element[];
}

export interface Coords {
    x: number;
    y: number;
}

function OptionsButton(props: Props): JSX.Element {

    const btnRef = useRef<HTMLButtonElement>(null);

    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [contextMenuCoords, setContextMenuCoords] = useState<Coords>({x: 0, y: 0});

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (btnRef.current === null)
                return;

            const bounds = btnRef.current.getBoundingClientRect();
            if (e.pageX < bounds.x || e.pageX > bounds.x + bounds.width || e.pageY < bounds.y || e.pageY > bounds.y + bounds.height)
                setShowContextMenu(false);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            <Button ref={btnRef} size="medium" type="soft" colour="dark" className="context pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500" onClick={_ => {
                setShowContextMenu(!showContextMenu);
                if (btnRef.current) {
                    const bounds = btnRef.current.getBoundingClientRect();
                    setContextMenuCoords({x: bounds.x, y: bounds.y});
                }
            }}>
                <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
            {showContextMenu &&
                <ContextMenu coords={contextMenuCoords}>
                    {props.children}
                </ContextMenu>
            }
        </>
    );
}

export default OptionsButton;
