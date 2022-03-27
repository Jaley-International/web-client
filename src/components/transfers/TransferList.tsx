import Card from "../containers/Card";
import TransferItem from "./TransferItem";
import {useRouter} from "next/router";
import {useState} from "react";
import Button from "../buttons/Button";
import {faRightLeft, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FileTransferProps} from "./FileTransferProvider";

interface Props {
    transfers: FileTransferProps[];
}

function TransferList(props: Props): JSX.Element {

    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();
    // Hide if in auth page or no transfer in progress
    if (props.transfers.length === 0 || router.route.match(/^\/auth.*$/))
        return <></>;

    return (
        <>
            <Button size="large" type="outline" colour="green" className="fixed pr-0 pl-0 h-14 w-14 right-8 bottom-8 rounded-full" onClick={() => setShow(!show)}>
                <div className="animate-pulse">
                    {show ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faRightLeft} />}
                </div>
            </Button>

            {show &&
                    <Card className="fixed right-28 bottom-8 w-4/12 z-10">
                        <>
                            {props.transfers.map((transfer: FileTransferProps) => <TransferItem key={transfer.filename} transfer={transfer} />)}
                        </>
                    </Card>
            }
        </>
    );
}

export default TransferList;
