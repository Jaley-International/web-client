import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Display6} from "../components/text/Displays";
import {Heading2, Heading3} from "../components/text/Headings";
import TextInput from "../components/inputs/TextInput";
import Button from "../components/Button";
import Checkbox from "../components/inputs/Checkbox";
import {register} from "../logic/security";

function RegisterPage(): JSX.Element {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <section className="flex">
            <div className="hidden lg:inline flex-auto w-5/12 bg-blue-soft">
                <div className="p-12 h-12 inline-flex space-x-3 bg-blue w-full">
                    <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-silver-gradient-from to-silver-gradient-to text-center text-2lg text-blue py-1">
                        <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                    </div>
                    <Heading3 className="text-txt-heading-light h-12 py-2">Private Encrypted Cloud</Heading3>
                </div>

                <div className="py-52 px-20 xl:px-28 pt-48 bg-blue">
                    <Display6 className="text-txt-heading-light leading-tight">Keep control over your data.</Display6>
                    <br />
                    <span className="text-txt-body-light">Create your account and start storing and sharing your files securely.</span>
                </div>

                <div className="curve-divider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="bg-blue">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{fill: "#7895FF"}} />
                    </svg>
                </div>
                <div className="curve-divider">
                    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="bg-blue-light">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{fill: "#E1E8FF"}} />
                    </svg>
                </div>
            </div>
            <div className="flex-auto w-7/12 min-h-screen bg-bg-light">

                <div className="px-20 lg:px-36 xl:px-48">

                    <div className="my-12 h-12 inline-flex space-x-3 lg:invisible">
                        <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-txt-heading-light py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="text-blue h-12 py-2">Private Encrypted Cloud</Heading3>
                    </div>

                    <Heading2>Create your account</Heading2>
                    <span className="text-txt-heading">All fields are required.</span>

                    <form className="py-10 space-y-7">
                        <TextInput type="text" autocomplete="username" label="Username" name="username" required={true} onChange={(e) => setUsername(e.target.value)} />
                        <TextInput type="email" autocomplete="email" label="Email address" name="email" hint="Please use your company email address." placeholder="*********@company.com" required={true} onChange={(e) => setEmail(e.target.value)} />
                        <TextInput type="password" autocomplete="new-password" label="Password" name="password" hint="Must be at least 12 characters long, with numbers, upper and lower case letters." required={true} onChange={(e) => setPassword(e.target.value)} />
                        <TextInput type="password" autocomplete="new-password" label="Confirm password" name="password2" hint="Must match the password you entered above." required={true} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <Checkbox name="tos" check={false} required={true}>
                            <span className="text-txt-body">
                                By creating an account you agree to the <a href="#" className="font-semibold">Terms and Conditions</a>, and the <a href="#" className="font-semibold">Privacy Policy</a>.
                            </span>
                        </Checkbox>
                        <Button size="large" type="regular" colour="blue" className="w-full" onClick={(e) => {
                            e.preventDefault();
                            register(email, username, password, passwordConfirm).then(_ => {});
                        }}>
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
