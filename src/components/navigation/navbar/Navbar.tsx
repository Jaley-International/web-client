import NavbarItem from "./NavbarItem";
import {faFile, faFolderOpen, faBell, faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faUserShield, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Heading3} from "../../text/Headings";
import Link from "next/link";
import {useState} from "react";
import TransferList from "../../transfers/TransferList";
import {terminateSession} from "../../../util/processes";
import {useRouter} from "next/router";

function Navbar(): JSX.Element {

    const [showFileTransfers, setShowFileTransfers] = useState(false);

    const toggleFileTransfers = () => {
        setShowFileTransfers(prev => !prev);
    }

    const router = useRouter();

    return (
        <>
            <TransferList show={showFileTransfers}/>
            <nav className="w-14 lg:w-2/12 max-w-xs min-h-screen bg-white border-r-2 border-border relative">

                <Link href="/" passHref>
                    <div className="inline-flex space-x-3 px-1 lg:px-4 py-8 w-full cursor-pointer">
                        <div className="w-9 h-9 mx-auto lg:mx-0 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-md text-white py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="hidden 3xl:flex text-blue my-auto tracking-tighter">Private Encrypted Cloud</Heading3>
                        <Heading3 className="hidden lg:flex 3xl:hidden text-blue my-auto tracking-tighter">PEC</Heading3>
                    </div>
                </Link>

                <NavbarItem name="Files" icon={faFile} activeRoutes={[/^\/files$/]} href="/files" />
                <NavbarItem name="Tracked&nbsp;folders" activeRoutes={[]} icon={faFolderOpen} className="cursor-not-allowed" />
                <NavbarItem name="Admin&nbsp;panel" activeRoutes={[/^\/users.*$/]} icon={faUserShield} href="/users" />

                <div className="w-full py-6">
                    <hr className="mx-auto w-2/3 text-grey-200" />
                </div>

                <NavbarItem name="Notifications" activeRoutes={[]} icon={faBell} badge="12" className="cursor-not-allowed" />
                <NavbarItem name="My&nbsp;account" activeRoutes={[]} icon={faUserCircle} className="cursor-not-allowed" />

                <NavbarItem name="Logout" active={false} activeRoutes={[]} icon={faSignOutAlt} className="absolute inset-x-0 bottom-2" action={async () => {
                    await terminateSession();
                    await router.reload();
                }} />
                {
                    // FIXME File transfer view
                    /* <NavbarItem name="File&nbsp;transfers" active={showFileTransfers} activeRoutes={[]} icon={faExchangeAlt} className="absolute inset-x-0 bottom-2" badge="3" action={() => toggleFileTransfers()} />*/
                }

            </nav>
        </>
    );
}

export default Navbar;
