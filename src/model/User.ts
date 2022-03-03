export enum UserAccessLevel {GUEST = "GUEST", USER = "USER", ADMINISTRATOR = "ADMINISTRATOR"}

export default interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    job: string;
    group: string;
    accessLevel: UserAccessLevel;
    createdAt: number;
}
