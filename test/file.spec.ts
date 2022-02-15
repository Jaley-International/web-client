import {
    downloadFile,
    uploadFile
} from "../src/util/processes";
import "../src/model";
const { expect } = require("chai");
const File = require("../src/model/file");
const User = require("../src/model.user");
let apiUrl = process.env.PEC_CLIENT_API_URL!;
let testfile = new File();

describe("File functions", ()=> {
    describe("file upload", ()=> {
        it("should have a status of success upon sending the file", ()=> {
            expect(uploadFile(testfile, testfile._fileId, "abc", apiUrl)).to.be.true;
        });
    });
    describe("file download", function(){
        it("should have a status of success upon receving the file", ()=> {
            //expect(downloadFile()).to.be.true;
        });
        it("file downloaded should match file on sended", ()=> {

        });
    });
});