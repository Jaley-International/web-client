interface Props {
    value: number;
    colour: string;
    size: number;
    className?: string;
}

function ProgressBar(props: Props): JSX.Element {
    return (
        <div className={`overflow-hidden flex rounded-full h-${props.size} bg-${props.colour}-soft ${props.className || ""}`}>
            <div style={{width: props.value + "%"}} className={`shadow-none flex flex-col whitespace-nowrap justify-center bg-${props.colour}-light`} />
        </div>
    );
}

export default ProgressBar;
