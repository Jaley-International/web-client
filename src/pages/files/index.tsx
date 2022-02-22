import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faServer,
    faFileUpload,
    faFolderPlus
} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useRef} from "react";
import Breadcrumb from "../../components/navigation/breadcrumb/Breadcrumb";
import Navbar from "../../components/navigation/navbar/Navbar";
import Button from "../../components/buttons/Button";
import Header from "components/sections/Header";
import FileListView, {FileListViewRef} from "../../components/sections/FileListView";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";

function FilesPage(): JSX.Element {

    const addToast = useContext(ToastContext);

    const fileListRef = useRef<FileListViewRef | null>(null);

    return (
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
                    <FileListView ref={fileListRef} addToast={addToast} />
                </ContentTransition>

            </div>
        </div>
    );
}

export default FilesPage;
