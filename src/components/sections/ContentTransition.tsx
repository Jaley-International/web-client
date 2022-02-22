import {motion} from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[];
    [propName: string]: any;
}

function ContentTransition(props: Props): JSX.Element {
    return (
        <motion.div {...props} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: .2}}>
            {props.children}
        </motion.div>
    );
}

export default ContentTransition;
