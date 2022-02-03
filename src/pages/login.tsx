import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Display6} from "../components/text/Displays";
import {Heading2, Heading3} from "../components/text/Headings";
import TextInput from "../components/inputs/TextInput";
import Button from "../components/buttons/Button";
import Link from 'next/link';
import {request} from "../util/communication";
import {authenticate} from "../util/security";
import ToastPortal, {ToastRef} from "../components/toast/ToastPortal";
import {ToastProps} from "../components/toast/Toast";
import {GetStaticProps, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";

function LoginPage({api_url}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {

    const router = useRouter();

    const toastRef = useRef<ToastRef>(null);
    const addToast = (toast: ToastProps) => {
        toastRef.current?.addMessage(toast);
    };

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (submitting) {
            (usernameRef.current as HTMLInputElement).disabled = true;
            (passwordRef.current as HTMLInputElement).disabled = true;
            (submitRef.current as HTMLButtonElement).disabled = true;
            (submitRef.current as HTMLButtonElement).classList.add("animate-pulse");
        } else {
            (usernameRef.current as HTMLInputElement).disabled = false;
            (passwordRef.current as HTMLInputElement).disabled = false;
            (submitRef.current as HTMLButtonElement).disabled = false;
            (submitRef.current as HTMLButtonElement).classList.remove("animate-pulse");
            (passwordRef.current as HTMLInputElement).value = "";
        }
    }, [submitting]);

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
                        <span className="text-txt-body-light">Sign in and start storing and sharing your files securely.</span>
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

                        <div className="my-28 h-12 inline-flex space-x-3 lg:invisible">
                            <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-txt-heading-light py-1">
                                <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                            </div>
                            <Heading3 className="hidden md:flex text-blue h-12 py-2">Private Encrypted Cloud</Heading3>
                            <Heading3 className="flex md:hidden text-blue h-12 py-2">PEC</Heading3>
                        </div>

                        <Heading2>Welcome back 👋</Heading2>
                        <span className="text-txt-heading">Please enter your credentials.</span>

                        <form className="py-10 space-y-7" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!submitting) {
                                setSubmitting(true);

                                const username = usernameRef.current?.value as string;
                                const password = passwordRef.current?.value as string;

                                // Salt request
                                const response = await request("POST", `${api_url}/users/getSalt`, {username: username});
                                if (response.status === 200 || response.status === 201) {
                                    const salt = response.data;

                                    // Authentication request
                                    const result = await authenticate(username, password, salt, api_url);
                                    if (result) {
                                        addToast({type: "success", title: "Welcome!", message: "Successfully authenticated."});
                                        setTimeout(() => router.push("/"), 2000);
                                    } else {
                                        addToast({type: "warning", title: "Invalid credentials", message: "Please check your username and password then try again."});
                                    }

                                } else {
                                    addToast({type: "error", title: "Could not authenticate", message: "An unexpected error occurred. Please try again later."});
                                }

                                setSubmitting(false);
                            }
                        }}>
                            <TextInput ref={usernameRef} type="text" autoComplete="username" label="Username" name="username" required={true} minLength={3} maxLength={16} validator={(str: string) => /^[0-9a-zA-Z-]{3,16}$/.test(str)} />
                            <TextInput ref={passwordRef} type="password" autoComplete="password" label="Password" name="password" required={true} />
                            <Button ref={submitRef} size="large" type="regular" colour="blue" className="w-full">
                                Login
                            </Button>
                            <br />
                            <p className="text-center text-txt-body-muted text-2xs">
                                Need to create an account? <Link href="/register"><a className="text-blue">Register</a></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            <ToastPortal ref={toastRef} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            api_url: process.env.PEC_CLIENT_API_URL
        }
    };
};

export default LoginPage;
