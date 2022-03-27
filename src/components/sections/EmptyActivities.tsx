import Card from "../containers/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Heading2} from "../text/Headings";
import React from "react";
import {useTranslations} from "use-intl";

function EmptyActivities(): JSX.Element {
    const t = useTranslations();

    return (
        <div className="w-full">
            <Card className="w-1/2 my-4 md:my-20 lg:my-48 mx-auto">
                <div className="md:flex p-4">
                    <div className="px-12 flex justify-center items-center bg-blue-soft rounded-xl text-center">
                        <span className="text-3xl text-blue">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </div>
                    <div className="w-full p-10">
                        <Heading2>No activity</Heading2>
                        <span className="text-txt-body">No activity was found based on your filters.</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default EmptyActivities;
