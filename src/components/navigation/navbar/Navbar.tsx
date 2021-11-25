import NavbarItem from "./NavbarItem";
import {faFile, faFolderOpen, faBell, faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faUserShield, faSlidersH, faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Heading3} from "../../text/Headings";
import Link from "next/link";

function Navbar(): JSX.Element {
    return (
        <nav className="w-2/12 min-h-screen bg-white border-r-2 border-border">

            <Link href="/">
                <div className="inline-flex space-x-3 px-1 md:px-4 py-8 w-full cursor-pointer">
                    <div className="w-9 h-9 mx-auto md:mx-0 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-md text-white py-1">
                        <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                    </div>
                    <Heading3 className="hidden 3xl:flex text-blue my-auto tracking-tighter">Private Encrypted Cloud</Heading3>
                    <Heading3 className="hidden md:flex 3xl:hidden text-blue my-auto tracking-tighter">PEC</Heading3>
                </div>
            </Link>

            <NavbarItem name="Files" icon={faFile} active={true} />
            <NavbarItem name="Tracked&nbsp;folders" icon={faFolderOpen} />
            <NavbarItem name="Admin&nbsp;panel" icon={faUserShield} />

            <div className="w-full py-6">
                <hr className="mx-auto w-2/3 text-grey-200" />
            </div>

            <NavbarItem name="Notifications" icon={faBell} badge="12" />
            <NavbarItem name="Settings" icon={faSlidersH} />
            <NavbarItem name="My&nbsp;account" icon={faUserCircle} />

            <div className="fixed bottom-4">
                <NavbarItem name="File&nbsp;transfers" icon={faExchangeAlt} />
            </div>

        </nav>
    );
}

export default Navbar;
