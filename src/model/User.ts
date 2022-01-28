class User {

    private readonly _userId: number;
    private readonly _username: string;
    private _firstName: string;
    private _lastName: string;

    public constructor(userId: number, username: string, firstName: string, lastName: string) {
        this._userId = userId;
        this._username = username;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }
}

export default User;
