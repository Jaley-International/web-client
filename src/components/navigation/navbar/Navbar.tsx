import NavbarItem from "./NavbarItem";
import {faFile, faBell, faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faUserShield, faSignOutAlt, faListUl} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Heading3} from "../../text/Headings";
import Link from "next/link";
import {terminateSession} from "../../../helper/processes";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";
import {useTranslations} from "use-intl";

function Navbar(): JSX.Element {

    const t = useTranslations();
    const router = useRouter();

    return (
        <>
            <nav className="w-14 lg:w-2/12 max-w-xs min-h-screen bg-white border-r-2 border-border relative">

                <Link href="/" passHref>
                    <div className="inline-flex space-x-3 px-1 lg:px-4 py-8 w-full cursor-pointer">
                        <div className="w-9 h-9 mx-auto lg:mx-0 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-md text-white py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="hidden 3xl:flex text-blue my-auto tracking-tighter">{t("generic.app.name")}</Heading3>
                        <Heading3 className="hidden lg:flex 3xl:hidden text-blue my-auto tracking-tighter">{t("generic.app.abbr")}</Heading3>
                    </div>
                </Link>

                <NavbarItem name={t("navbar.files")} icon={faFile} activeRoutes={[/^\/files$/]} href="/files" />
                <NavbarItem name={t("navbar.activity-log")} icon={faListUl} activeRoutes={[/^\/activity.*$/]} href="/activity" />

                <div className="w-full py-6">
                    <hr className="mx-auto w-2/3 text-grey-200" />
                </div>

                <NavbarItem name={t("navbar.my-account")} activeRoutes={[]} icon={faUserCircle} className="cursor-not-allowed" />
                <NavbarItem name={t("navbar.admin-panel")} activeRoutes={[/^\/users.*$/]} icon={faUserShield} href="/users" />

                <NavbarItem name={t("navbar.logout")} active={false} activeRoutes={[]} icon={faSignOutAlt} className="absolute inset-x-0 bottom-2" action={async () => {
                    await terminateSession();
                    await router.reload();
                }} />

            </nav>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: require(`../../../locales/${locale}.json`)
        }
    }
};

export default Navbar;
