interface Props {
    children: JSX.Element | JSX.Element[] | string;
    className?: string
}

export function Display1({children, className}: Props): JSX.Element {
    return (
        <h1 className={`text-8xl font-bold ${className}`}>{children}</h1>
    );
}
export function Display2({children, className}: Props): JSX.Element {
    return (
        <h2 className={`text-7xl font-bold ${className}`}>{children}</h2>
    );
}
export function Display3({children, className}: Props): JSX.Element {
    return (
        <h3 className={`text-6xl font-bold ${className}`}>{children}</h3>
    );
}
export function Display4({children, className}: Props): JSX.Element {
    return (
        <h4 className={`text-5xl font-bold ${className}`}>{children}</h4>
    );
}
export function Display5({children, className}: Props): JSX.Element {
    return (
        <h5 className={`text-4xl font-bold ${className}`}>{children}</h5>
    );
}
export function Display6({children, className}: Props): JSX.Element {
    return (
        <h6 className={`text-3xl font-bold ${className}`}>{children}</h6>
    );
}
