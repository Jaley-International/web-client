import React from "react";
import User from "../../model/User";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Badge from "../Badge";

interface Props {
    user: User;
}

function Activity(props: Props): JSX.Element {
    return (
        <div className="bg-bg shadow-card px-2 py-3 rounded-xl flex text-xs">
            {props.user.profilePicture ?
                <div
                    className="bg-cover bg-center w-9 h-9 rounded-full mr-1"
                    style={{backgroundImage: `url(${props.user.profilePicture})`}}/>
                :
                <div
                    className="grid h-9 w-9 rounded-full bg-silver my-auto mr-1">
                    <FontAwesomeIcon className="m-auto text-silver-dark" icon={faUser}/>
                </div>
            }
            <p className="my-auto text-grey-600">
                <span className="text-grey-800 font-medium cursor-pointer">{props.user.firstName} {props.user.lastName}</span>
                &nbsp;uploaded the file
                "<span className="text-grey-800 font-medium cursor-pointer">2021 Expenses.csv</span>" into&nbsp;
                <span className="text-grey-800 font-medium cursor-pointer">Budget</span> / <span className="text-grey-800 font-medium cursor-pointer">2021</span> / <span className="text-grey-800 font-medium cursor-pointer">Expense reports</span>.
            </p>

            <Badge text="21 minutes ago" size="small" colour="light" className="my-auto absolute transform -translate-x-1/2 right-0 mt-1" />
        </div>
    );
}

export default Activity;
