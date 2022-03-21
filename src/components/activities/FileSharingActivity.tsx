import Activity, {ActivityProps} from "./Activity";
import React from "react";
import {Node} from "../../helper/processes";
import User from "../../model/User";

interface Props {
    activity: ActivityProps;
    node: Node;
    recipient: User;
}

function FileSharingActivity(props: Props): JSX.Element {
    return (
        <Activity activity={props.activity}>
            <>
                <span className="text-grey-800 font-medium cursor-pointer">{props.activity.user.firstName} {props.activity.user.lastName}</span>
                &nbsp;shared the file
                &quot;<span className="text-grey-800 font-medium cursor-pointer">{props.node.metaData.name}</span>&quot; with&nbsp;
                <span className="text-grey-800 font-medium cursor-pointer">{props.recipient.firstName} {props.recipient.lastName}</span>
            </>
        </Activity>
    );
}

export default FileSharingActivity;
