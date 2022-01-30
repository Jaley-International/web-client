import Button from "../buttons/Button";
import {useRef} from "react";

function FileDropArea(): JSX.Element {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="border-dashed border-2 border-grey-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-txt-body-muted flex flex-wrap justify-center">
                <span>Drag and drop your file here or</span>
            </p>
            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => {
                alert("File added");
            }} />
            <Button ref={uploadButtonRef} size="medium" type="soft" colour="blue" onClick={() => {
                if (fileInputRef.current !== null)
                    fileInputRef.current.click();
            }}>Upload a file</Button>
        </div>
    );
}

export default FileDropArea;
