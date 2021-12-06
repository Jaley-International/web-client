import {Heading5} from "../text/Headings";

interface Props {
    children: JSX.Element;
    title?: string;
    className?: string;
}

function Card(props: Props): JSX.Element {
    return (
        <div className={`bg-bg shadow-card rounded-2xl ${props.className ? props.className : ""}`}>
            <>
                {props.title &&
                    <div className="w-full px-6 border-b border-grey-200">
                        <Heading5 className="py-4">{props.title}</Heading5>
                    </div>
                }
                {props.children}
            </>
        </div>
    );
}

export default Card;
