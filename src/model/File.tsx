class File {

    private readonly _fileId: number;
    private readonly _filename: string;

    public constructor(fileId: number, filename: string) {
        this._fileId = fileId;
        this._filename = filename;
    }

    public get fileId(): number {
        return this._fileId;
    }

    public get filename(): string {
        return this._filename;
    }
}

export default File;
