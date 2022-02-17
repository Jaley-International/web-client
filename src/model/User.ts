export enum UserAccountType {GUEST = "Guest", USER = "User", ADMINISTRATOR = "Administrator"}

export default interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    job: string;
    group: string;
    accountType: UserAccountType;
}
