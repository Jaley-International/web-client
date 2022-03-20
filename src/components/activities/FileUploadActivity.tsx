import Activity, {ActivityProps} from "./Activity";
import React from "react";
import {Node} from "../../helper/processes";

interface Props {
    activity: ActivityProps;
    node: Node;
}

function FileUploadActivity(props: Props): JSX.Element {
    return (
        <Activity activity={props.activity}>
            <>
                <span className="text-grey-800 font-medium cursor-pointer">{props.activity.user.firstName} {props.activity.user.lastName}</span>
                &nbsp;uploaded the file
                "<span className="text-grey-800 font-medium cursor-pointer">{props.node.metaData.name}</span>" into&nbsp;
                <span className="text-grey-800 font-medium cursor-pointer">Budget</span> / <span className="text-grey-800 font-medium cursor-pointer">2021</span> / <span className="text-grey-800 font-medium cursor-pointer">Expense reports</span>.
            </>
        </Activity>
    );
}

export default FileUploadActivity;
