import ModalHeader from "./subcomponents/ModalHeader";
import Button from "../../buttons/Button";
import {useEffect, useState} from "react";
import {logoutSession, Session} from "../../../util/processes";
import {useRouter} from "next/router";

interface Props {
    session: Session;
}

function ExpandSessionModal(props: Props): JSX.Element {

    const expire = props.session.exp as number;
    const router = useRouter();

    const [remaining, setRemaining] = useState<number>(expire - Date.now());

    useEffect(() => {
        if (remaining > 0) {
            const timer = setInterval(() => setRemaining(expire - Date.now()), 1000);
            return () => clearInterval(timer);
        } else {
            logoutSession();
            router.push("/").then(_ => {});
        }
    }, [remaining, setRemaining]);

    if (remaining > 60000)
        return <></>;

    return (
        <>
            <div className="z-10 top-0 left-0 absolute w-full h-full bg-white bg-opacity-40 firefox:bg-opacity-40 backdrop-filter backdrop-blur-sm" />
            <div className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-t-2xl rounded-b-sm bg-grey-75 blur-md shadow-2xl">
                    <ModalHeader title="Session logout" className="text-center" />
                    <div className="py-8 px-20 text-center">

                        <span>
                            Your session is about to expire due to inactivity.<br />
                            Unless you extend your session, you will be logged out in {Math.max(Math.round(remaining / 1000), 0)} second{Math.round(remaining / 1000) >= 2 ? "s" : ""}.
                        </span>

                        <div className="pt-8 text-center space-x-4">
                            <Button size="medium" type="regular" colour="orange" onClick={() => alert("TODO Extend session")}>Extend session</Button>
                            <Button size="medium" type="regular" colour="dark" onClick={async () => {
                                logoutSession();
                                await router.push("/");
                            }}>Logout immediately</Button>
                        </div>
                    </div>
                    <div className="w-full" style={{width: "700px"}}>
                        <div className="rounded-full bg-orange-light h-1 transition-width duration-1000 ease-linear" style={{width: `${(700 * (remaining / 60000))}px`}} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExpandSessionModal;
