import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUser} from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/inputs/TextInput";
import React, {useContext, useEffect, useRef, useState} from "react";
import {request} from "../../helper/communication";
import getConfig from "next/config";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import AutocompleteTextInput from "../../components/inputs/AutocompleteTextInput";
import {getGroupsJobsSuggestions} from "../../util/user";

function NewUser(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();

    const addToast = useContext(ToastContext);

    const previewName = useRef<HTMLParagraphElement>(null);
    const previewEmail = useRef<HTMLParagraphElement>(null);
    const previewJobGroup = useRef<HTMLParagraphElement>(null);

    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLInputElement>(null);
    const jobRef = useRef<HTMLInputElement>(null);
    const accessLevelRef = useRef<HTMLInputElement>(null);

    const updatePreview = (() => {
        const firstname = (firstnameRef.current as HTMLInputElement).value;
        (previewName.current as HTMLParagraphElement).innerText =
            (firstname.length > 0 ? firstname[0].toUpperCase() + firstname.substring(1) : firstname) + " " +
            (lastnameRef.current as HTMLInputElement).value.toUpperCase();

        const job = (jobRef.current as HTMLInputElement).value !== "" ? (jobRef.current as HTMLInputElement).value : "Unknown";
        const group = (groupRef.current as HTMLInputElement).value !== "" ? (groupRef.current as HTMLInputElement).value : "Unknown";
        (previewJobGroup.current as HTMLParagraphElement).innerText = [job, group].join(", ");

        (previewEmail.current as HTMLParagraphElement).innerText = (emailRef.current as HTMLInputElement).value;
    });

    const updateDefaultUsername = () => {
        const firstname = (firstnameRef.current as HTMLInputElement).value;
        const lastname = (lastnameRef.current as HTMLInputElement).value;
        if (firstname.length > 0 && lastname.length > 0)
            (usernameRef.current as HTMLInputElement).value = (firstname[0] + lastname).toLowerCase();
    }


    const [loadedSuggestions, setLoadedSuggestions] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<string[][]>([[],[]]);

    const fetchSuggestions = async () => {
        setSuggestions(await getGroupsJobsSuggestions());
        setLoadedSuggestions(true);
    }
    useEffect(() => {
        if (!loadedSuggestions)
            fetchSuggestions().then(_ => {});
    });

    return (
        <div className="flex bg-bg-light">
            <Navbar/>
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="User pre-registration">
                    <Link href="/users" passHref>
                        <Button size="small" type="regular" colour="orange">
                            <span><FontAwesomeIcon icon={faArrowLeft}/>&nbsp;&nbsp;Discard and go back</span>
                        </Button>
                    </Link>
                </Header>

                <ContentTransition className="w-full p-8 pb-40">

                    <div className="mb-10">
                        <div className="flex space-x-4">
                            <div className="grid rounded-full w-24 lg:w-32 h-24 lg:h-32 bg-silver my-auto">
                                <FontAwesomeIcon className="m-auto text-silver-dark text-4xl lg:text-6xl"
                                                 icon={faUser}/>
                            </div>
                            <div>
                                <p ref={previewName} className="text-xl font-semibold text-txt-heading">&nbsp;</p>
                                <p ref={previewJobGroup}>&nbsp;</p>
                                <p ref={previewEmail} className="text-txt-body align-bottom">&nbsp;</p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-2" onSubmit={async (e) => {
                        e.preventDefault();

                        const firstname = (firstnameRef.current as HTMLInputElement).value;
                        const lastname = (lastnameRef.current as HTMLInputElement).value;
                        const username = (usernameRef.current as HTMLInputElement).value;
                        const email = (emailRef.current as HTMLInputElement).value;
                        const group = (groupRef.current as HTMLInputElement).value;
                        const job = (jobRef.current as HTMLInputElement).value;
                        const accessLevel = (accessLevelRef.current as HTMLInputElement).value.toUpperCase();

                        const createUserData = {
                            firstName: firstname,
                            lastName: lastname,
                            username: username,
                            email: email,
                            group: group,
                            job: job,
                            accessLevel: accessLevel
                        };
                        const response = await request("POST", `${publicRuntimeConfig.apiUrl}/users`, createUserData);

                        if (response.status === "SUCCESS") {
                            addToast({
                                type: "success",
                                title: "Account created",
                                message: "User account created successfully."
                            });
                        } else if (response.status === "ERROR_USERNAME_ALREADY_USED") {
                            addToast({
                                type: "warning",
                                title: "Username already in use",
                                message: "Failed to create an account : Username already in use."
                            });
                        } else if (response.status === "ERROR_EMAIL_ALREADY_USED") {
                            addToast({
                                type: "warning",
                                title: "Email already in use",
                                message: "Failed to create an account : Email already in use."
                            });
                        } else if (response.status === "ERROR_INVALID_ACCESS_LEVEL") {
                            addToast({
                                type: "error",
                                title: "Insufficient permissions",
                                message: "Administrator privileges are required to create an account."
                            });
                        } else {
                            addToast({
                                type: "error",
                                title: "Failed to create an account",
                                message: "An unknown error occurred while creating the account."
                            });
                        }
                    }}>

                        <div className="lg:flex">
                            <TextInput ref={firstnameRef} className="lg:w-1/2 lg:pr-4" type="text"
                                       autoComplete="given-name" label="First name" name="firstname" required={true}
                                       minLength={1} maxLength={32}
                                       validator={(str: string) => /^[0-9a-zA-Z-]{1,32}$/.test(str)}
                                       onChange={() => {
                                           updatePreview();
                                           updateDefaultUsername();
                                       }}/>
                            <TextInput ref={lastnameRef} className="lg:w-1/2 lg:pl-4" type="text"
                                       autoComplete="family-name" label="Last name" name="lastname" required={true}
                                       minLength={1} maxLength={32}
                                       validator={(str: string) => /^[0-9a-zA-Z-]{1,32}$/.test(str)}
                                       onChange={() => {
                                           updatePreview();
                                           updateDefaultUsername();
                                       }}/>
                        </div>
                        <div className="lg:flex">
                            <TextInput ref={usernameRef} className="lg:w-1/2 lg:pr-4" type="text"
                                       autoComplete="username" label="Username" name="username" required={true}
                                       minLength={3} maxLength={16}
                                       validator={(str: string) => /^[0-9a-zA-Z-]{3,16}$/.test(str)}
                                       onChange={updatePreview}/>
                            <TextInput ref={emailRef} className="lg:w-1/2 lg:pl-4" type="email" autoComplete="email"
                                       label="Email address" name="email" required={true}
                                       validator={(str: string) => /\S+@\S+\.\S+/.test(str)}
                                       onChange={updatePreview}/>
                        </div>
                        <div className="lg:flex">
                            <AutocompleteTextInput ref={groupRef} containerClassName="lg:w-1/3 lg:pr-4" type="text" label="Group" required={true} suggestions={suggestions[0]} onChange={updatePreview} />

                            <AutocompleteTextInput ref={jobRef} containerClassName="lg:w-1/3 lg:px-2" type="text" label="Job title" required={true} suggestions={suggestions[1]} onChange={updatePreview} />

                            <AutocompleteTextInput ref={accessLevelRef} containerClassName="lg:w-1/3 lg:pl-4" type="text" label="Access level" required={true} suggestions={[
                                "Guest",
                                "User",
                                "Administrator"
                            ]} onChange={updatePreview} validator={(str: string) => {
                                return ["GUEST", "USER", "ADMINISTRATOR"].includes(str.toUpperCase());
                            }} />

                        </div>

                        <br/>

                        <Button size="medium" type="regular" colour="blue" className="w-full">
                            Create user
                        </Button>

                    </form>
                </ContentTransition>

            </div>
        </div>
    );
}

export default NewUser;
