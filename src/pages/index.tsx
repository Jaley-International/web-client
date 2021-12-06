import Navbar from "../components/navigation/navbar/Navbar";
import Header from "../components/sections/Header";
import Breadcrumb from "../components/navigation/breadcrumb/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faServer, faEllipsisV, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faFile, faFileWord, faCalendar} from "@fortawesome/free-regular-svg-icons";
import Card from "../components/containers/Card";
import Button from "../components/Button";

function HomePage(): JSX.Element {
    return (
        <div className="flex">
            <Navbar />
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="Files">
                    <Breadcrumb items={[
                        {icon: faServer, href: "/"},
                        {title: "Cases", href: "/"},
                        {title: "Case #42 Mr. Dupont", href: "/"},
                        {title: "Bills and invoices"},
                    ]} />
                </Header>

                <div className="w-full p-8">
                    <Card title="Files" className="pb-2">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                    <th className="w-5/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faFile} />
                                        <span>File name</span>
                                    </th>
                                    <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        <span>Upload date</span>
                                    </th>
                                    <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faUserFriends} />
                                        <span>Shared with</span>
                                    </th>
                                    <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <span>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-scroll h-4/6">
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-grey-200">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-3">
                                            <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord} />
                                            </div>
                                            <div className="grid content-center leading-4">
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span><br />
                                                <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-txt-body text-xs">
                                            September 1, 2021
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex">
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3" style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                            <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="w-full">
                                            <Button size="medium" type="soft" colour="dark" className="pl-4 pr-4 pt-2 pb-2 text-txt-body-muted bg-bg hover:bg-grey-400 active:bg-grey-500">
                                                <FontAwesomeIcon icon={faEllipsisV} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default HomePage;
