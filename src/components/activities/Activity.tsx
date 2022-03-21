import React from "react";
import User from "../../model/User";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Badge from "../Badge";
import {timeSince} from "../../util/string";

export interface ActivityProps {
    user: User;
    timestamp: number;
}

interface Props {
    activity: ActivityProps;
    children: JSX.Element;
}

function Activity(props: Props): JSX.Element {
    return (
        <div className="bg-bg shadow-card px-2 py-3 rounded-xl flex text-xs">
            {props.activity.user.profilePicture ?
                <div
                    className="bg-cover bg-center w-9 h-9 rounded-full mr-1"
                    style={{backgroundImage: `url(${props.activity.user.profilePicture})`}}/>
                :
                <div
                    className="grid h-9 w-9 rounded-full bg-silver my-auto mr-1">
                    <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                </div>
            }
            <p className="my-auto text-grey-600">
                {props.children}
            </p>

            <Badge text={`${timeSince(props.activity.timestamp)} ago`} size="small" colour="light" className="my-auto absolute transform -translate-x-1/2 right-0 mt-1" />
        </div>
    );
}

export default Activity;
