import {
    authenticate,
    register
} from "../src/util/processes";
import {request} from "../src/util/communication";

const { expect } = require("chai");
const User = require("../src/model.user");

const updateStatus = (message: string) => {message = message};
let apiUrl = process.env.PEC_CLIENT_API_URL!;
const testUser = {
    mail: "Test@test.com",
    username: "test",
    passwd: "jaimelesaussissonsec"
};

describe("Authentication", ()=>{
    it("connection API OK",async () => {
        expect(await request("GET", `${apiUrl}/file-system`, {})).to.be.true;
    });
   describe("POST register",()=>{
      it("should have a status of success upon user creation",()=>{
          expect(register(testUser.username, testUser.mail, testUser.passwd, updateStatus, apiUrl)).to.be.true;
      })
   });
   describe("POST login",()=>{
       it("Should deny access to invalid credentials", () => {
           const Wrongpasswd = "jedetestelesaussission";
           expect(authenticate(testUser.username, Wrongpasswd, apiUrl, updateStatus)).to.be.false
       });
       it("Should allow access with valid credentials", () => {
            expect(authenticate(testUser.username, testUser.passwd, apiUrl, updateStatus)).to.be.true
       });
   });
});
