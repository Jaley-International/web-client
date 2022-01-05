import Card from "../containers/Card";
import TransferItem from "./TransferItem";

interface Props {
    show: boolean;
}

function TransferList(props: Props): JSX.Element {

    return (
        <>
            {props.show ?
                    <Card className="absolute left-14 lg:left-2/12 bottom-0 w-4/12 z-10 bg-bg-light">
                        <>
                            <TransferItem
                                filename={"Creditor bank details.docx"}
                                path={"/Cases/Case #42 Mr. Dupont/Bills and..."}
                                progress={91}
                                status={"Encrypting"}
                                type={"upload"}/>
                            <TransferItem
                                filename={"Form no 829420.pdf"}
                                path={"/Protocol/Forms"}
                                progress={30}
                                status={"Sending"}
                                type={"upload"}/>
                            <TransferItem
                                filename={"Expenses.xlsx"}
                                path={"/Cases/Case #44 SA Tupex/Bills and i..."}
                                progress={58}
                                status={"Receiving"}
                                type={"download"}/>
                        </>
                    </Card>
            : null}
        </>
    );
}

export default TransferList;
