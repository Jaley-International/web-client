import Activity, {ActivityProps} from "./Activity";
import React from "react";
import {Node} from "../../helper/processes";

interface Props {
    activity: ActivityProps;
    node: Node;
}

function FileOverwriteActivity(props: Props): JSX.Element {
    return (
        <Activity activity={props.activity}>
            <>
                <span className="text-grey-800 font-medium cursor-pointer">{props.activity.user.firstName} {props.activity.user.lastName}</span>
                &nbsp;overwrote the file
                &quot;<span className="text-grey-800 font-medium cursor-pointer">{props.node.metaData.name}</span>&quot;
            </>
        </Activity>
    );
}

export default FileOverwriteActivity;
