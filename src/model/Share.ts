import User from "./User";

export default interface Share {
    id: number;
    shareKey: string;
    shareSignature: string;
    sender: User;
    recipient: User;
}
