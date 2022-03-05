import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faServer,
    faFileUpload,
    faFolderPlus
} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useRef, useState} from "react";
import Breadcrumb from "../../components/navigation/breadcrumb/Breadcrumb";
import Navbar from "../../components/navigation/navbar/Navbar";
import Button from "../../components/buttons/Button";
import Header from "components/sections/Header";
import FileListView, {FileListViewRef} from "../../components/sections/FileListView";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import {request} from "../../helper/communication";
import getConfig from "next/config";
import {decryptFileSystem, EncryptedNode, Node} from "../../helper/processes";
import {BreadcrumbItemProps} from "../../components/navigation/breadcrumb/BreadcrumbItem";

function FilesPage(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();
    const addToast = useContext(ToastContext);

    const fileListRef = useRef<FileListViewRef | null>(null);

    const [folderId, setFolderId] = useState<number>(1);
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemProps[]>([]);

    // Breadcrumb update
    useEffect(() => {
        // Get path
        request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${folderId}/path`, {}).then(response => {
            if (response.status !== "SUCCESS")
                return;

            // Decrypt path
            let path: Node[] = [];
            response.data.path.forEach((node: EncryptedNode) => {
                const decrypted = decryptFileSystem(node, 0);
                if (decrypted)
                    path.push(decrypted);
            });

            // Update breadcrumb
            let newBreadcrumbItems: BreadcrumbItemProps[] = [];
            path.forEach((node, i) => {
                if (node.id === 1) {
                    newBreadcrumbItems.push({icon: faServer, action: () => fileListRef.current?.changerFolder(node.id)});
                } else if (i === path.length - 1) {
                    newBreadcrumbItems.push({title: node.metaData.name});
                } else {
                    newBreadcrumbItems.push({title: node.metaData.name, action: () => fileListRef.current?.changerFolder(node.id)});
                }
            });
            setBreadcrumbItems(newBreadcrumbItems);
        });
    }, [folderId]);


    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="Files">
                    <div className="flex">
                        <div className="w-full">
                            <Breadcrumb items={breadcrumbItems}/>
                        </div>
                        <div className="w-96 text-right space-x-4">
                            <Button size="small" type="regular" colour="blue" onClick={() => fileListRef.current?.openUploadPrompt()}>
                                <span><FontAwesomeIcon icon={faFileUpload}/>&nbsp;&nbsp;Upload file</span>
                            </Button>

                            <Button size="small" type="regular" colour="cyan" onClick={() => fileListRef.current?.openCreateFolderModal()}>
                                <span><FontAwesomeIcon icon={faFolderPlus}/>&nbsp;&nbsp;Create folder</span>
                            </Button>
                        </div>
                    </div>
                </Header>

                <ContentTransition>
                    <FileListView ref={fileListRef} addToast={addToast} onFolderChange={(folderId) => {
                        setFolderId(folderId);
                    }} />
                </ContentTransition>

            </div>
        </div>
    );
}

export default FilesPage;
