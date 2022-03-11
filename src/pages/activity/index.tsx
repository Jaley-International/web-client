import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import ContentTransition from "../../components/sections/ContentTransition";
import React from "react";
import {GetStaticProps} from "next";
import EmptyActivities from "../../components/sections/EmptyActivities";

function ActivityPage(): JSX.Element {

    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title={"Activity"}>
                    <div className="flex">
                        <div className="w-full">
                            FILTERS
                        </div>
                    </div>
                </Header>

                <ContentTransition>
                    <EmptyActivities />
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
