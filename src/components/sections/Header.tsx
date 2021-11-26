import {Heading2} from "../text/Headings";

interface Props {
    title: string;
    children?: JSX.Element | JSX.Element[];
}

function Header(props: Props): JSX.Element {
    return (
        <div className="w-full py-8 px-10 border-b border-grey-200">
            <Heading2>{props.title}</Heading2>
            {props.children &&
                <div className="mt-4">
                    {props.children}
                </div>
            }
        </div>
    );
}

export default Header;
