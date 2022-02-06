import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faServer,
    faUserFriends,
    faCloudDownloadAlt,
    faShareAlt,
    faUsersCog, faFileImport, faFileUpload, faFolderPlus, faLock
} from "@fortawesome/free-solid-svg-icons";
import {faFile, faFileWord, faCalendar, faEye, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import React, {useEffect, useRef, useState} from "react";
import Breadcrumb from "../../components/navigation/breadcrumb/Breadcrumb";
import Navbar from "../../components/navigation/navbar/Navbar";
import Button from "../../components/buttons/Button";
import Card from "../../components/containers/Card";
import OptionsButton from "../../components/buttons/OptionsButton";
import ContextMenuItem from "../../components/containers/contextmenu/ContextMenuItem";
import File from "../../model/File";
import Header from "components/sections/Header";
import DeleteFileModal from "../../components/containers/modals/DeleteFileModal";
import CreateFolderModal from "../../components/containers/modals/CreateFolderModal";
import OverwriteFileModal from "../../components/containers/modals/OverwriteFileModal";
import {decryptFileSystem, downloadFile, EncryptedNode, Node, uploadFile} from "../../util/security";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import ToastPortal, {ToastRef} from "../../components/toast/ToastPortal";
import {ToastProps} from "../../components/toast/Toast";
import {request} from "../../util/communication";

function FilesPage({apiUrl, fs}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {

    const toastRef = useRef<ToastRef>(null);
    const addToast = (toast: ToastProps) => {
        toastRef.current?.addMessage(toast);
    };

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showOverwriteModal, setShowOverwriteModal] = useState<boolean>(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(false);
    const [modalFileTarget, setModalFileTarget] = useState<File | null>(null);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchFilesystem = async () => {
        const response = await request("GET", `${apiUrl}/filesystems`, {});
        if (response.status === "SUCCESS")
            setRawFilesystem(response.data);
        else
            addToast({type: "error", title: "File system load error", message: "Could not fetch your file system."});
    }

    const processUpload = (files: FileList | null) => {
        if (!files || !filesystem) return;

        for (let i = 0; i < files.length; ++i) {
            const file = files.item(i);

            if (file) {
                uploadFile(file, filesystem.id, "abc", apiUrl).then(async success => {
                    if (success) {
                        addToast({type: "success", title: "File uploaded", message: `Your file ${file.name} has been uploaded successfully.`});
                        await fetchFilesystem();
                    } else {
                        addToast({type: "error", title: "File upload error", message: `Your file ${file.name} could not be uploaded.`});
                    }
                });
            }
        }

        // @ts-ignore
        fileInputRef.current?.files = null;
    };


    const [rawFilesystem, setRawFilesystem] = useState<EncryptedNode>(fs)
    const [filesystem, setFilesystem] = useState<Node | null>(null);

    useEffect(() => {
        if (rawFilesystem) {
            const decrypted = decryptFileSystem(rawFilesystem as unknown as EncryptedNode[]);
            if (decrypted)
                setFilesystem(decrypted);
            else
                addToast({type: "error", title: "File system decryption error", message: "Could not decrypt your file system."});
        } else {
            addToast({type: "error", title: "File system load error", message: "Could not fetch your file system."});
        }
    }, [rawFilesystem, setFilesystem]);

    return (
        <>
            <div className="flex bg-bg-light">
                <Navbar/>
                <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                    <Header title="Files">
                        <div className="flex">
                            <div className="w-full">
                                <Breadcrumb items={[
                                    {icon: faServer, href: "/"},
                                    {title: "Cases", href: "/"},
                                    {title: "Case #42 Mr. Dupont", href: "/"},
                                    {title: "Bills and invoices"},
                                ]}/>
                            </div>
                            <div className="w-96 text-right space-x-4">
                                <Button size="small" type="regular" colour="blue" onClick={() => {
                                    if (fileInputRef.current)
                                        fileInputRef.current.click();
                                }}>
                                    <span><FontAwesomeIcon icon={faFileUpload}/>&nbsp;&nbsp;Upload file</span>
                                </Button>
                                <input ref={fileInputRef} type="file" className="hidden" multiple={true}
                                       onChange={() => {
                                           if (fileInputRef.current)
                                               processUpload(fileInputRef.current.files);
                                       }}/>

                                <Button size="small" type="regular" colour="cyan"
                                        onClick={() => setShowCreateFolderModal(true)}>
                                    <span><FontAwesomeIcon icon={faFolderPlus}/>&nbsp;&nbsp;Create folder</span>
                                </Button>
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
                             processUpload(e.dataTransfer.files);
                         }}
                    >
                        <Card title="Files" className="pb-2">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                    <th className="w-5/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faFile}/>
                                        <span>File name</span>
                                    </th>
                                    <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faCalendar}/>
                                        <span>Upload date</span>
                                    </th>
                                    <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <FontAwesomeIcon icon={faUserFriends}/>
                                        <span>Shared with</span>
                                    </th>
                                    <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                        <span>Actions</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="overflow-y-scroll h-4/6">

                                {filesystem && filesystem.children.map(node => {
                                    return (
                                        <tr className="border-b border-grey-200" key={node.id}>
                                            <td className="py-2 px-4">
                                                <div className="flex space-x-3">
                                                    <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                        <FontAwesomeIcon className="m-auto text-silver-dark" icon={faFileWord}/>
                                                    </div>
                                                    <div className="grid content-center leading-4">
                                                        <span className="text-txt-heading font-semibold text-2xs">{node.metaData.name}</span>
                                                        <span
                                                            className="text-txt-body-muted font-light text-4xs">PDF Document</span>
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
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div className="w-full">
                                                    <OptionsButton>
                                                        <ContextMenuItem name="Preview" icon={faEye} action={() => alert("TODO File preview")}/>
                                                        <ContextMenuItem name="Download" icon={faCloudDownloadAlt} action={async () => {
                                                            await downloadFile(node, apiUrl, addToast);
                                                        }}/>
                                                        <ContextMenuItem name="Share" icon={faShareAlt} action={() => alert("TODO File sharing")}/>
                                                        <ContextMenuItem name="Manage permissions" icon={faUsersCog} action={() => alert("TODO Permission modal")}/>
                                                        <ContextMenuItem name="Lock file" icon={faLock} action={() => alert("TODO File locking")}/>
                                                        <ContextMenuItem name="Overwrite" icon={faFileImport} action={() => {
                                                            setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                            setShowOverwriteModal(true);
                                                        }}/>
                                                        <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                            setModalFileTarget(new File(0, "Creditor bank details.pdf"));
                                                            setShowDeleteModal(true);
                                                        }}/>
                                                    </OptionsButton>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                })}

                                </tbody>
                            </table>
                        </Card>
                    </div>

                </div>
                {showDeleteModal && modalFileTarget !== null &&
                    <DeleteFileModal file={modalFileTarget} closeCallback={() => {
                        setShowDeleteModal(false);
                        setModalFileTarget(null);
                    }}/>
                }
                {showOverwriteModal && modalFileTarget !== null &&
                    <OverwriteFileModal file={modalFileTarget} closeCallback={() => {
                        setShowOverwriteModal(false);
                        setModalFileTarget(null);
                    }}/>
                }
                {showCreateFolderModal &&
                    <CreateFolderModal closeCallback={() => setShowCreateFolderModal(false)} apiUrl={apiUrl} addToast={addToast} parentId={filesystem?.id || 0} />
                }
            </div>
            <ToastPortal ref={toastRef}/>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {

    // Requesting file system
    let filesystem = [];
    const response = await request("GET", `${process.env.PEC_CLIENT_API_URL}/filesystems`, {});
    if (response.status === "SUCCESS")
        filesystem = response.data;

    return {
        props: {
            apiUrl: process.env.PEC_CLIENT_API_URL,
            fs: filesystem
        }
    };
};

export default FilesPage;
