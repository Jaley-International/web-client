import Navbar from "../components/navigation/navbar/Navbar";
import Header from "../components/sections/Header";
import Breadcrumb from "../components/navigation/breadcrumb/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faServer,
    faUserFriends,
    faCloudDownloadAlt,
    faShareAlt,
    faUsersCog, faFileImport, faFileUpload
} from "@fortawesome/free-solid-svg-icons";
import {faFile, faFileWord, faCalendar, faEye, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import Card from "../components/containers/Card";
import ContextMenuItem from "../components/containers/contextmenu/ContextMenuItem";
import OptionsButton from "../components/buttons/OptionsButton";
import {useRef, useState} from "react";
import File from "../model/File";
import DeleteFileModal from "../components/containers/modals/DeleteFileModals";
import OverwriteFileModal from "../components/containers/modals/OverwriteFileModal";
import Button from "../components/buttons/Button";

function HomePage(): JSX.Element {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showOverwriteModal, setShowOverwriteModal] = useState<boolean>(false);
    const [modalFileTarget, setModalFileTarget] = useState<File | null>(null);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processUpload = () => {
        alert("TODO File upload");
    };

    return (
        <div className="flex bg-bg-light">
            <Navbar />
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="Files">
                    <div className="flex">
                        <div className="w-full">
                            <Breadcrumb items={[
                                {icon: faServer, href: "/"},
                                {title: "Cases", href: "/"},
                                {title: "Case #42 Mr. Dupont", href: "/"},
                                {title: "Bills and invoices"},
                            ]} />
                        </div>
                        <div className="w-48 text-right">
                            <Button size="small" type="regular" colour="blue" onClick={() => {
                                if (fileInputRef.current)
                                    fileInputRef.current.click();
                            }}>
                                <span><FontAwesomeIcon icon={faFileUpload} />&nbsp;&nbsp;Upload file</span>
                            </Button>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => {
                                processUpload();
                            }} />
                        </div>
                    </div>
                </Header>

                <div className={`w-full ${isDragging ? " p-8 border-4 border-blue border-dashed" : "p-9"}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        processUpload();
                    }}
                >
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
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
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
                                            <OptionsButton>
                                                <ContextMenuItem name="Preview" icon={faEye} action={() => alert("TODO File preview")} />
                                                <ContextMenuItem name="Download" icon={faCloudDownloadAlt} action={() => alert("TODO File download")} />
                                                <ContextMenuItem name="Share" icon={faShareAlt} action={() => alert("TODO File sharing")} />
                                                <ContextMenuItem name="Manage permissions" icon={faUsersCog} action={() => alert("TODO Permission modal")} />
                                                <ContextMenuItem name="Overwrite" icon={faFileImport} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowOverwriteModal(true);
                                                }} />
                                                <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowDeleteModal(true);
                                                }} />
                                            </OptionsButton>
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
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
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
                                            <OptionsButton>
                                                <ContextMenuItem name="Preview" icon={faEye} action={() => alert("TODO File preview")} />
                                                <ContextMenuItem name="Download" icon={faCloudDownloadAlt} action={() => alert("TODO File download")} />
                                                <ContextMenuItem name="Share" icon={faShareAlt} action={() => alert("TODO File sharing")} />
                                                <ContextMenuItem name="Manage permissions" icon={faUsersCog} action={() => alert("TODO Permission modal")} />
                                                <ContextMenuItem name="Overwrite" icon={faFileImport} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowOverwriteModal(true);
                                                }} />
                                                <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowDeleteModal(true);
                                                }} />
                                            </OptionsButton>
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
                                                <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
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
                                            <OptionsButton>
                                                <ContextMenuItem name="Preview" icon={faEye} action={() => alert("TODO File preview")} />
                                                <ContextMenuItem name="Download" icon={faCloudDownloadAlt} action={() => alert("TODO File download")} />
                                                <ContextMenuItem name="Share" icon={faShareAlt} action={() => alert("TODO File sharing")} />
                                                <ContextMenuItem name="Manage permissions" icon={faUsersCog} action={() => alert("TODO Permission modal")} />
                                                <ContextMenuItem name="Overwrite" icon={faFileImport} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowOverwriteModal(true);
                                                }} />
                                                <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                    setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                    setShowDeleteModal(true);
                                                }} />
                                            </OptionsButton>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>

            </div>
            {showDeleteModal && modalFileTarget !== null &&
                <DeleteFileModal file={modalFileTarget} closeCallback={() => {
                    setShowDeleteModal(false);
                    setModalFileTarget(null);
                }} />
            }
            {showOverwriteModal && modalFileTarget !== null &&
                <OverwriteFileModal file={modalFileTarget} closeCallback={() => {
                    setShowOverwriteModal(false);
                    setModalFileTarget(null);
                }} />
            }
        </div>
    );
}

export default HomePage;
