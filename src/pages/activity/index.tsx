import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import ContentTransition from "../../components/sections/ContentTransition";
import React, {useState} from "react";
import {GetStaticProps} from "next";
import EmptyActivities from "../../components/sections/EmptyActivities";
import {useRouter} from "next/router";
import Badge from "../../components/Badge";
import Activity from "../../components/containers/Activity";
import {UserAccessLevel} from "../../model/User";

function ActivityPage(): JSX.Element {

    const router = useRouter();

    // TODO : Change states for entities themselves instead of ids
    const [nodeId, setNodeId] = useState<number | null>(router.query.node && +router.query.node ? +router.query.node : null);
    const [userId, setUserId] = useState<number | null>(router.query.user && +router.query.user ? +router.query.user : null);

    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title={"Activity"}>
                    <div className="flex">
                        <div className="w-full space-x-4">

                            {nodeId ?
                                <Badge text="File : Expenses.csv" size="small" colour="dark"
                                       removeCallback={() => setNodeId(null)}
                                       clickCallback={() => {
                                           setNodeId(1);
                                       }}
                                />
                            :
                                <Badge text="No file selected" size="small" colour="light"
                                       clickCallback={() => {
                                           setNodeId(1);
                                       }}
                                />
                            }

                            {userId ?
                                <Badge text="User : John Doe" size="small" colour="dark"
                                       removeCallback={() => setUserId(null)}
                                       clickCallback={() => {
                                           setUserId(1);
                                       }}
                                />
                                :
                                <Badge text="No user selected" size="small" colour="light"
                                       clickCallback={() => {
                                           setUserId(1);
                                       }}
                                />
                            }

                        </div>
                    </div>
                </Header>

                <ContentTransition>
                {(!userId && !nodeId) ?
                    <EmptyActivities />
                    :
                    <div className="pt-4 px-6 space-y-6 mb-2">
                        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((activity, index) => {
                            return (
                                <Activity key={index} user={{
                                    username: "eporet",
                                    email: "eva.poret@company.com",
                                    firstName: "Eva",
                                    lastName: "PORET",
                                    profilePicture: "https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                                    job: "",
                                    group: "",
                                    accessLevel: UserAccessLevel.USER,
                                    createdAt: 0,
                                }} />
                            );
                        })}
                    </div>
                }
                </ContentTransition>


            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: require(`../../locales/${locale}.json`)
        }
    }
};

export default ActivityPage;
