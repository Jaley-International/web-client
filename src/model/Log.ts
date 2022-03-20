import User from "./User";
import {EncryptedNode, ShareLink} from "../helper/processes";

export enum LogType {
    USER = 'USER',
    NODE = 'NODE',
}

export enum ActivityType {
    USER_CREATION = 'USER_CREATION',
    USER_REGISTRATION = 'USER_REGISTRATION',
    USER_VALIDATION = 'USER_VALIDATION',
    USER_LOGIN = 'USER_LOGIN',
    USER_UPDATE = 'USER_UPDATE',
    USER_DELETION = 'USER_DELETION',
    FILE_UPLOAD = 'FILE_UPLOAD',
    FILE_DOWNLOAD = 'FILE_DOWNLOAD',
    FILE_SHARING = 'FILE_SHARING',
    FILE_DELETION = 'FILE_DELETION',
    FILE_MOVING = 'FILE_MOVING',
    FILE_OVERWRITE = 'FILE_OVERWRITE',
    FOLDER_CREATION = 'FOLDER_CREATION',
    FOLDER_DELETION = 'FOLDER_DELETION',
    FOLDER_MOVING = 'FOLDER_MOVING',
}

export default interface Log {
    id: number,
    timestamp: number,
    logType: LogType,
    activityType: ActivityType

    subject: User; // The user who is the subject of an activity, e.g., the user who is created by admin.
    performer: User; // The user who performs the activity, e.g., the admin who creates the user.
    // Sometimes the performer and the subject are the same person, e.g., the user who logs in.

    node: EncryptedNode;
    oldParent: EncryptedNode;
    newParent: EncryptedNode;
    curUser: User;
    owner: User;
    sharedWith: User;
    link: ShareLink;

    //session: Session;
}
