import React from "react";
import {Display6} from "../components/text/Displays";
import {Heading2} from "../components/text/Headings";
import TextInput from "../components/inputs/TextInput";
import Button from "../components/Button";

function RegisterPage(): JSX.Element {
    return (
        <section className="flex">
            <div className="hidden lg:inline flex-1 bg-blue">
                <div className="p-20 pt-48">
                    <Display6 className="text-txt-heading-light">Welcome to Private Encrypted Cloud!</Display6>
                    <br />
                    <span className="text-txt-body-light">Keep control over your data.</span>
                </div>
            </div>
            <div className="flex-1 min-h-screen bg-white">
                <div className="p-20">
                    <Heading2>Create your account</Heading2>
                    <span className="text-txt-heading">All fields are required.</span>

                    <form className="py-10 space-y-3">
                        <TextInput type="email" autocomplete="email" label="Email address" name="email" placeholder="*********@company.com" />
                        <TextInput type="password" autocomplete="new-password" label="Password" name="password" hint="Must be at least 12 characters long, with numbers, upper and lower case letters." />
                        <TextInput type="password" autocomplete="new-password" label="Confirm password" name="password2" />
                        <br />
                        <Button size="large" type="regular" colour="blue" className="w-full" onClick={() => alert("TODO")}>
                            Register
                        </Button>
                        <br />
                        <p className="text-center text-txt-body-muted text-2xs">
                            Already have an account? <a className="text-blue" href="/login">Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
