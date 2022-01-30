export enum UserAccountType {GUEST = "Guest", USER = "User", ADMINISTRATOR = "Administrator"}

class User {

    private readonly _userId: number;
    private readonly _username: string;
    private readonly _email: string;
    private _firstName: string;
    private _lastName: string;
    private _profilePicture: string | null;
    private _job: string;
    private _group: string;
    private _accountType: UserAccountType;

    public constructor(userId: number, username: string, email: string, firstName: string, lastName: string, profilePicture: string | null = null, job: string, group: string, accountType: UserAccountType) {
        this._userId = userId;
        this._username = username;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._profilePicture = profilePicture;
        this._job = job;
        this._group = group;
        this._accountType = accountType;
    }

    public get userId(): number {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get profilePicture(): string | null {
        return this._profilePicture;
    }

    public get job(): string {
        return this._job;
    }

    public get group(): string {
        return this._group;
    }

    public get accountType(): UserAccountType {
        return this._accountType;
    }
}

export default User;
