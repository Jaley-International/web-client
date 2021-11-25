interface Props {
    children: JSX.Element | JSX.Element[] | string;
    className?: string
}

export function Heading1({children, className}: Props): JSX.Element {
    return (
        <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>
    );
}
export function Heading2({children, className}: Props): JSX.Element {
    return (
        <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
    );
}
export function Heading3({children, className}: Props): JSX.Element {
    return (
        <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
    );
}
export function Heading4({children, className}: Props): JSX.Element {
    return (
        <h4 className={`text-md font-bold ${className}`}>{children}</h4>
    );
}
export function Heading5({children, className}: Props): JSX.Element {
    return (
        <h5 className={`text-sm font-semibold ${className}`}>{children}</h5>
    );
}
export function Heading6({children, className}: Props): JSX.Element {
    return (
        <h6 className={`text-xs font-semibold ${className}`}>{children}</h6>
    );
}
