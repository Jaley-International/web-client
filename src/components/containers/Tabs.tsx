import {useState} from "react";

interface Tab {
    child: JSX.Element;
    name: string;
}

interface Props {
    tabs: Tab[];
}

function Tabs(props: Props): JSX.Element {

    const [current, setCurrent] = useState<number>(0);

    return (
        <>
            <div className="flex space-x-8 font-semibold">
                {props.tabs.map((tab, index) => {
                    return <span
                        key={index}
                        className={`cursor-pointer pb-3 ${current === index ? "border-b border-blue border-1 text-grey-900" : "text-grey-600"}`}
                        onClick={() => setCurrent(index)}
                    >
                        {tab.name}
                    </span>;
                })}
            </div>

            <div className="mt-8">
                {props.tabs[current].child}
            </div>
        </>
    );
}

export default Tabs;
