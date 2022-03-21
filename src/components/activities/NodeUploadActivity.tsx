import Activity, {ActivityProps} from "./Activity";
import React, {useEffect, useState} from "react";
import {decryptFileSystem, EncryptedNode, Node} from "../../helper/processes";
import {request} from "../../helper/communication";
import getConfig from "next/config";

interface Props {
    activity: ActivityProps;
    node: Node;
}

function NodeUploadActivity(props: Props): JSX.Element {

    const {publicRuntimeConfig} = getConfig();

    // getting created node path

    const [path, setPath] = useState<Node[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchPath = async () => {
        const pathResponse = await request("GET", `${publicRuntimeConfig.apiUrl}/file-system/${props.node.id}/path`, {});

        // decryption
        let pathTmp: Node[] = [];
        pathResponse.data.path.forEach((node: EncryptedNode) => {
            const decrypted = decryptFileSystem(node, 0);
            if (decrypted)
                pathTmp.push(decrypted);
        });
        setPath(pathTmp);

        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded)
            fetchPath().then(_ => {});
    });

    return (
        <Activity activity={props.activity}>
            <>
                <span className="text-grey-800 font-medium cursor-pointer">{props.activity.user.firstName} {props.activity.user.lastName}</span>
                &nbsp;uploaded the {props.node.type === "FILE" ? "file" : "folder"}&nbsp;
                &quot;<span className="text-grey-800 font-medium cursor-pointer">{props.node.metaData.name}</span>&quot; into&nbsp;

                {path.map((parent, index) => {
                    return <span key={index} className="text-grey-800 font-medium cursor-pointer">/{parent.metaData.name}</span>;
                })}
            </>
        </Activity>
    );
}

export default NodeUploadActivity;
