import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Display6} from "../../components/text/Displays";
import {Heading2, Heading3} from "../../components/text/Headings";
import TextInput from "../../components/inputs/TextInput";
import Button from "../../components/buttons/Button";
import Checkbox from "../../components/inputs/Checkbox";
import {register} from "../../util/processes";
import ToastPortal, {ToastRef} from "../../components/toast/ToastPortal";
import {ToastProps} from "../../components/toast/Toast";
import NewPasswordInput from "../../components/inputs/NewPasswordInput";
import Link from "next/link";
import {useRouter} from "next/router";

function RegisterPage(): JSX.Element {

    const toastRef = useRef<ToastRef>(null);
    const addToast = (toast: ToastProps) => {
        toastRef.current?.addMessage(toast);
    };

    const router = useRouter();
    const params = router.asPath.split("#");
    const registrationKey = params.length === 2 ? params.pop() : "";

    const registerKeyRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const tosRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const [submitting, setSubmitting] = useState(false);

    return (
        <>
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
                        <svg data-name="Layer 1" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="bg-blue">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{fill: "#7895FF"}} />
                        </svg>
                    </div>
                    <div className="curve-divider">
                        <svg data-name="Layer 2" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="bg-blue-light">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{fill: "#E1E8FF"}} />
                        </svg>
                    </div>
                </div>
                <div className="flex-auto w-7/12 min-h-screen bg-bg-light">

                    <div className="px-8 md:px-20 lg:px-36 xl:px-48">

                        <div className="my-12 h-12 inline-flex space-x-3 lg:invisible">
                            <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-txt-heading-light py-1">
                                <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                            </div>
                            <Heading3 className="hidden md:flex text-blue h-12 py-2">Private Encrypted Cloud</Heading3>
                            <Heading3 className="flex md:hidden text-blue h-12 py-2">PEC</Heading3>
                        </div>

                        <Heading2>Create your account</Heading2>
                        <span className="text-txt-heading">All fields are required.</span>

                        <form className="py-10 space-y-7" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!submitting) {
                                setSubmitting(true);

                                const updateStatus = (message: string) => {
                                    if (submitRef.current)
                                        submitRef.current.innerText = message;
                                }

                                const statusCode = await register(registerKeyRef.current?.value as string, passwordRef.current?.value as string, updateStatus);
                                if (statusCode === "SUCCESS")
                                    addToast({type: "success", title: "Account created", message: "Please check your emails to finalize your registration."});
                                else if (statusCode === "ERROR_INVALID_REGISTER_KEY")
                                    addToast({type: "warning", title: "Invalid registration key", message: "The registration key you provided is invalid."});
                                else
                                    addToast({type: "error", title: "Failed to create an account", message: "An unknown error occurred while creating your account."});
                                updateStatus("Register");
                                setSubmitting(false);

                                (passwordRef.current as HTMLInputElement).value = "";
                                (passwordConfirmRef.current as HTMLInputElement).value = "";
                            }
                        }}>
                            <TextInput ref={registerKeyRef} type="text" label="Registration key" defaultValue={registrationKey} name="registerKey" hint="Code received by email to register your account." autoFocus={true} required={true} disabled={submitting} minLength={16} maxLength={16} validator={(str: string) => /^[0-9a-zA-Z-_]{16}$/.test(str)} />
                            <NewPasswordInput ref={passwordRef} label="Password" name="password" required={true} disabled={submitting} />
                            <TextInput ref={passwordConfirmRef} type="password" autoComplete="new-password" label="Confirm password" name="password2" hint="Must match the password you entered above." required={true} disabled={submitting} validator={(str: string) => str === passwordRef.current?.value} onChange={() => passwordRef.current?.value !== passwordConfirmRef.current?.value ? passwordConfirmRef.current?.setCustomValidity("Passwords don't match.") : passwordConfirmRef.current?.setCustomValidity("")} />
                            <Checkbox ref={tosRef} name="tos" check={false} required={true} disabled={submitting}>
                                <span className="text-txt-body">
                                    By creating an account you agree to the <a href="#" className="font-semibold">Terms and Conditions</a>, and the <a href="#" className="font-semibold">Privacy Policy</a>.
                                </span>
                            </Checkbox>
                            <Button ref={submitRef} size="large" type="regular" colour="blue" className={`w-full${submitting ? " animate-pulse" : ""}`} disabled={submitting}>
                                Register
                            </Button>
                            <br />
                            <p className="text-center text-txt-body-muted text-2xs">
                                Already registered? <Link href="/auth"><a className="text-blue">Sign in</a></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            <ToastPortal ref={toastRef} />
        </>
    );
}

export default RegisterPage;
