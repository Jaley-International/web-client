import Navbar from "../components/navigation/navbar/Navbar";
import Header from "../components/sections/Header";
import Breadcrumb from "../components/navigation/breadcrumb/Breadcrumb";
import {faServer} from "@fortawesome/free-solid-svg-icons";

function HomePage(): JSX.Element {
    return (
        <div className="flex">
            <Navbar />
            <div className="w-10/12">
                <Header title="Files">
                    <Breadcrumb items={[
                        {icon: faServer, href: "/"},
                        {title: "Cases", href: "/"},
                        {title: "Case #42 Mr. Dupont", href: "/"},
                        {title: "Bills and invoices"},
                    ]} />
                </Header>
            </div>
        </div>
    );
}

export default HomePage;
