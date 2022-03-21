export enum UserAccessLevel {GUEST = "GUEST", USER = "USER", ADMINISTRATOR = "ADMINISTRATOR"}

export enum UserStatus {
    OK = 'OK',
    PENDING_REGISTRATION = 'PENDING_REGISTRATION',
    PENDING_VALIDATION = 'PENDING_VALIDATION',
    SUSPENDED = 'SUSPENDED',
}

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
    userStatus: UserStatus;
}
