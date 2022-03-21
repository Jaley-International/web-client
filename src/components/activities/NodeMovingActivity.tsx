import Activity, {ActivityProps} from "./Activity";
import React, {useEffect, useState} from "react";
import {decryptFileSystem, EncryptedNode, Node} from "../../helper/processes";
import {request} from "../../helper/communication";
import getConfig from "next/config";

interface Props {
    activity: ActivityProps;
    node: Node;
    oldParent: Node;
    newParent: Node;
}

function NodeMovingActivity(props: Props): JSX.Element {

    const {publicRuntimeConfig} = getConfig();

    // getting old and new parents paths

    const [oldParentPath, setOldParentPath] = useState<Node[]>([]);
    const [newParentPath, setNewParentPath] = useState<Node[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchPaths = async () => {
        const oldParentPathResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${props.oldParent.id}/path`, {});
        const newParentPathResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${props.newParent.id}/path`, {});

        // decryption

        let oldParentPathTmp: Node[] = [];
        let newParentPathTmp: Node[] = [];

        oldParentPathResponse.data.path.forEach((node: EncryptedNode) => {
            const decrypted = decryptFileSystem(node, 0);
            if (decrypted)
                oldParentPathTmp.push(decrypted);
        });

        newParentPathResponse.data.path.forEach((node: EncryptedNode) => {
            const decrypted = decryptFileSystem(node, 0);
            if (decrypted)
                newParentPathTmp.push(decrypted);
        });

        setOldParentPath(oldParentPathTmp);
        setNewParentPath(newParentPathTmp);

        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchPaths().then(_ => {});
    });

    return (
        <Activity activity={props.activity}>
            <>
                <span className="text-grey-800 font-medium cursor-pointer">{props.activity.user.firstName} {props.activity.user.lastName}</span>
                &nbsp;moved the file
                &quot;<span className="text-grey-800 font-medium cursor-pointer">{props.node.metaData.name}</span>
                &quot; from&nbsp;&quot;
                <span className="text-grey-800 font-medium cursor-pointer">
                    {oldParentPath.map((parent, index) => {
                        return <span key={index} className="text-grey-800 font-medium cursor-pointer">/{parent.metaData.name}</span>;
                    })}
                </span>
                &quot; to&nbsp;&quot;
                <span className="text-grey-800 font-medium cursor-pointer">
                    {newParentPath.map((parent, index) => {
                        return <span key={index} className="text-grey-800 font-medium cursor-pointer">/{parent.metaData.name}</span>;
                    })}
                </span>
                &quot;
            </>
        </Activity>
    );
}

export default NodeMovingActivity;
