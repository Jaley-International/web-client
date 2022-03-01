import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faEye,
    faFile,
    faTimesCircle
} from "@fortawesome/free-regular-svg-icons";
import {
    faCloudDownloadAlt, faFileImport,
    faGripLinesVertical, faLock,
    faPencilAlt,
    faShareAlt,
    faUserFriends,
    faUsersCog
} from "@fortawesome/free-solid-svg-icons";
import OptionsButton from "../buttons/OptionsButton";
import ContextMenuItem from "../containers/contextmenu/ContextMenuItem";
import {
    createFolder,
    createNodeShareLink,
    decryptFileSystem,
    downloadFile, EncryptedNode,
    Node,
    uploadFile
} from "../../helper/processes";
import {request} from "../../helper/communication";
import React, {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ToastProps} from "../toast/Toast";
import getConfig from "next/config";
import DeleteNodeModal from "../containers/modals/DeleteNodeModal";
import OverwriteFileModal from "../containers/modals/OverwriteFileModal";
import CreateFolderModal from "../containers/modals/CreateFolderModal";
import ShareLinkModal from "../containers/modals/ShareLinkModal";
import Card from "components/containers/Card";
import {nodeToDescription, nodeToIcon} from "../../util/node";
import {useTranslations} from "use-intl";
import Link from "next/link";

interface Props {
    addToast: (toast: ToastProps) => void;
}

export interface FileListViewRef {
    openUploadPrompt: () => void;
    openCreateFolderModal: () => void;
}

const FileListView = forwardRef((props: Props, ref: Ref<FileListViewRef>) => {

    // Configuration import for API URL
    const {publicRuntimeConfig} = getConfig();

    // Strings import for multi language support
    const t = useTranslations();

    // Modal display statuses
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showOverwriteModal, setShowOverwriteModal] = useState<boolean>(false);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState<boolean>(false);
    const [showShareLinkModal, setShowShareLinkModal] = useState<boolean>(false);
    const [modalNodeTarget, setModalNodeTarget] = useState<Node | null>(null);

    // Node moving to folder
    const [dragNodeOrigin, setDragNodeOrigin] = useState<Node | null>(null);
    const [dragNodeDest, setDragNodeDest] = useState<Node | null>(null);

    // File upload from drag and drop
    const [isUploadDragging, setIsUploadDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // File system fetch
    const [filesystem, setFilesystem] = useState<Node | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchFilesystem = async () => {
        const response = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system`, {});
        if (response.status !== "SUCCESS") {
            props.addToast({type: "error", title: t("pages.file.list.toast.fetch.load.title"), message: t("pages.file.list.toast.fetch.load.message")});
            return;
        }
        const decrypted = decryptFileSystem(response.data.filesystem as EncryptedNode);
        if (!decrypted) {
            props.addToast({type: "error", title: t("pages.file.list.toast.fetch.decrypt.title"), message: t("pages.file.list.toast.fetch.decrypt.message")});
            return;
        }
        setFilesystem(decrypted);
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchFilesystem().then(_ => {});
    });


    // File upload
    const processUpload = (files: FileList | null) => {
        if (!files || !filesystem) return;

        for (let i = 0; i < files.length; ++i) {
            const file = files.item(i);

            if (file) {
                uploadFile(file, filesystem.id, "abc").then(async success => {
                    if (success) {
                        props.addToast({
                            type: "success",
                            title: t("pages.file.list.toast.upload.success.title"),
                            message: t.rich("pages.file.list.toast.upload.success.message", {name: file.name}).toString()
                        });
                        await fetchFilesystem();
                    } else {
                        props.addToast({
                            type: "error",
                            title: t("pages.file.list.toast.upload.error.title"),
                            message: t.rich("pages.file.list.toast.upload.error.message", {name: file.name}).toString()
                        });
                    }
                });
            }
        }
        if (fileInputRef.current)
            fileInputRef.current.files = null;
    };


    // Ref function call forward
    useImperativeHandle(ref, () => ({
        openUploadPrompt() {
            if (fileInputRef.current)
                fileInputRef.current.click();
        },
        openCreateFolderModal() {
            setShowCreateFolderModal(true);
        }
    }));

    return (
        <>
            <input ref={fileInputRef} type="file" className="hidden" multiple={true} onChange={() => {
                if (fileInputRef.current)
                    processUpload(fileInputRef.current.files);
            }}/>

            <div className={`w-full ${isUploadDragging ? "p-8 border-4 border-blue border-dashed" : "p-9"}`}
                 onDragOver={(e) => {
                     e.preventDefault();
                     if (!dragNodeOrigin)
                         setIsUploadDragging(true);
                 }}
                 onDragLeave={() => setIsUploadDragging(false)}
                 onDrop={(e) => {
                     e.preventDefault();
                     if (isUploadDragging) {
                         setIsUploadDragging(false);
                         processUpload(e.dataTransfer.files);
                     }
                 }}
            >
                <Card title="Files" className="pb-2">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                            <th className="w-5/10 font-semibold text-left px-6 py-4 space-x-3">
                                <FontAwesomeIcon icon={faFile}/>
                                <span>{t("generic.file.name")}</span>
                            </th>
                            <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <span>{t("generic.file.last-modified")}</span>
                            </th>
                            <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                <FontAwesomeIcon icon={faUserFriends}/>
                                <span>{t("generic.file.shared-with")}</span>
                            </th>
                            <th className="w-1/10 font-semibold text-left px-6 py-4 space-x-3">
                                <span>{t("generic.table.actions")}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="overflow-y-scroll h-4/6">

                        {filesystem && filesystem.children
                            .sort((a, b) => a.metaData.name.toLowerCase() > b.metaData.name.toLowerCase() ? 1 : -1)
                            .sort((a, b) => a.type === "FOLDER" ? (b.type === "FOLDER" ? 0 : -1) : (b.type === "FOLDER" ? 1 : 0))
                            .map(node => {
                                return (
                                    <tr className={`${dragNodeDest === node ? "border-2 border-blue border-dashed" : "m-0.5 border-b border-grey-200"}`} key={node.id}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (dragNodeOrigin && node.type === "FOLDER" && dragNodeOrigin !== node)
                                                setDragNodeDest(node);
                                        }}
                                        onDragLeave={() => setDragNodeDest(null)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            if (dragNodeOrigin && dragNodeDest) {
                                                // TODO Node drop in folder
                                                props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                setDragNodeDest(null);
                                            }
                                        }}
                                    >
                                        <td className="py-2 px-4" draggable={true}
                                            onDragStart={() => setDragNodeOrigin(node)}
                                            onDragEnd={() => setDragNodeOrigin(null)}
                                        >
                                            <div className="flex space-x-3">
                                                <div className="grid my-auto cursor-grab font-light">
                                                    <FontAwesomeIcon icon={faGripLinesVertical} className="text-grey-300" />
                                                </div>
                                                <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                    <FontAwesomeIcon className="m-auto text-silver-dark" icon={nodeToIcon(node)} />
                                                </div>
                                                <div className="grid content-center leading-4">
                                                    <span className="text-txt-heading font-semibold text-2xs">
                                                        {node.metaData.name}
                                                    </span>
                                                    <span className="text-txt-body-muted font-light text-4xs">
                                                        {nodeToDescription(node)}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">
                                            <span className="text-txt-body text-xs">
                                                {node.metaData.lastModified &&
                                                    new Date(node.metaData.lastModified).toUTCString()
                                                }
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
                                                {node.type === "FOLDER" ?
                                                    <OptionsButton>
                                                        <ContextMenuItem name="Rename" icon={faPencilAlt} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name="Share" icon={faShareAlt} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name="Manage permissions" icon={faUsersCog} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name="Lock folder" icon={faLock} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name="Delete" icon={faTimesCircle} action={() => {
                                                            setModalNodeTarget(node);
                                                            setShowDeleteModal(true);
                                                        }}/>
                                                    </OptionsButton>
                                                    :
                                                    <OptionsButton>
                                                        <ContextMenuItem name={t("generic.button.preview")} icon={faEye} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.download")} icon={faCloudDownloadAlt} action={async () => {
                                                            const status = await downloadFile(node);
                                                            if (status === "ERROR_FETCH")
                                                                props.addToast({type: "error", title: t("pages.file.list.toast.download.fail.title"), message: t("pages.file.list.toast.download.fail.message")});
                                                            else if (status === "ERROR_DECRYPT")
                                                                props.addToast({type: "error", title: t("pages.file.list.toast.download.decrypt.title"), message: t("pages.file.list.toast.download.decrypt.message")});
                                                            else if (status !== "SUCCESS")
                                                                props.addToast({type: "error", title: t("pages.file.list.toast.download.error.title"), message: t("pages.file.list.toast.download.error.message")});
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.share")} icon={faShareAlt} action={async () => {

                                                            const response = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${node.id}/links`, {});
                                                            if (response.status !== "SUCCESS")
                                                                return;

                                                            if (response.data.links.length === 0) {
                                                                const shareLink = await createNodeShareLink(node);
                                                                if (shareLink)
                                                                    node.shareLink = shareLink;
                                                            } else {
                                                                node.shareLink = response.data.links[0];
                                                            }


                                                            setModalNodeTarget(node);
                                                            setShowShareLinkModal(true);
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.manage-permission")} icon={faUsersCog} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.lock-file")} icon={faLock} action={() => {
                                                            props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.overwrite")} icon={faFileImport} action={() => {
                                                            setModalNodeTarget(node);
                                                            setShowOverwriteModal(true);
                                                        }}/>
                                                        <ContextMenuItem name={t("generic.button.delete")} icon={faTimesCircle} action={() => {
                                                            setModalNodeTarget(node);
                                                            setShowDeleteModal(true);
                                                        }}/>
                                                    </OptionsButton>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </Card>
            </div>

            {showDeleteModal && modalNodeTarget &&
                <DeleteNodeModal node={modalNodeTarget} closeCallback={() => {
                    setShowDeleteModal(false);
                    setModalNodeTarget(null);
                }} submitCallback={async () => {
                    const response = await request("DELETE", `${publicRuntimeConfig.apiUrl}/file-system/${modalNodeTarget.id}`, {});
                    if (response.status === "SUCCESS")
                        props.addToast({
                            type: "success",
                            title: t.rich("pages.file.list.toast.delete.success.title", {type: t(`generic.node.${modalNodeTarget?.type.toLowerCase()}`)}).toString(),
                            message: t.rich("pages.file.list.toast.delete.success.message", {type: t(`generic.node.${modalNodeTarget?.type.toLowerCase()}`)}).toString()
                        });
                    else
                        props.addToast({type: "error", title: t("pages.file.list.toast.delete.error.title"), message: t("pages.file.list.toast.delete.error.message")});
                    await fetchFilesystem();
                }}/>
            }
            {showOverwriteModal && modalNodeTarget &&
                <OverwriteFileModal node={modalNodeTarget} closeCallback={() => {
                    setShowOverwriteModal(false);
                    setModalNodeTarget(null);
                }} submitCallback={(file) => {
                    if (!file || !filesystem) return;
                    // TODO Overwrite file
                    props.addToast({type: "info", title: t("generic.toast.wip.title"), message: t("generic.toast.wip.message")});
                }}/>
            }
            {showCreateFolderModal &&
                <CreateFolderModal closeCallback={() => setShowCreateFolderModal(false)} submitCallback={async (name: string) => {

                    const success = filesystem && await createFolder(name, filesystem.id, "abc");

                    if (success) {
                        const message = t.rich("pages.file.list.toast.create.success.message", {name: name}).toString();
                        props.addToast({type: "success", title: t("pages.file.list.toast.create.success.title"), message: message});
                    }
                    else {
                        const message = t.rich("pages.file.list.toast.create.error.message", {name: name}).toString();
                        props.addToast({type: "error", title: t("pages.file.list.toast.create.error.title"), message: message});
                    }

                    await fetchFilesystem();

                }} />
            }
            {showShareLinkModal && modalNodeTarget && modalNodeTarget.shareLink &&
                <ShareLinkModal closeCallback={() => setShowShareLinkModal(false)} sharelink={modalNodeTarget.shareLink} />
            }
        </>
    );
});

FileListView.displayName = "FileListView";
export default FileListView;
