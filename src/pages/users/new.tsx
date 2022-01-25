import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import Link from "next/link";
import Button from "../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUser} from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/inputs/TextInput";
import React, {useEffect, useRef} from "react";
import Select from "../../components/inputs/Select";

function NewUser(): JSX.Element {

    const previewName = useRef<HTMLParagraphElement>(null);
    const previewEmail = useRef<HTMLParagraphElement>(null);
    const previewJobGroup = useRef<HTMLParagraphElement>(null);

    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLSelectElement>(null);
    const jobRef = useRef<HTMLSelectElement>(null);
    const accessLevelRef = useRef<HTMLSelectElement>(null);

    const updatePreview = (() => {
        const firstname = (firstnameRef.current as HTMLInputElement).value;
        (previewName.current as HTMLParagraphElement).innerText =
            (firstname.length > 0 ? firstname[0].toUpperCase() + firstname.substring(1) : firstname) + " " +
            (lastnameRef.current as HTMLInputElement).value.toUpperCase();

        const job = (jobRef.current as HTMLSelectElement).value !== "" ? (jobRef.current as HTMLSelectElement).value : "Unknown";
        const group = (groupRef.current as HTMLSelectElement).value !== "" ? (groupRef.current as HTMLSelectElement).value : "Unknown";
        (previewJobGroup.current as HTMLParagraphElement).innerText = [job, group].join(", ");

        (previewEmail.current as HTMLParagraphElement).innerText = (emailRef.current as HTMLInputElement).value;
    });

    const updateDefaultUsername = () => {
        const firstname = (firstnameRef.current as HTMLInputElement).value;
        const lastname = (lastnameRef.current as HTMLInputElement).value;
        if (firstname.length > 0 && lastname.length > 0)
            (usernameRef.current as HTMLInputElement).value = (firstname[0] + lastname).toLowerCase();
    }


    return (
        <div className="flex">
            <Navbar />
            <div className="w-10/12 fixed top-0 right-0 overflow-y-auto max-h-screen">
                <Header title="User pre-registration">
                    <Link href="/users">
                        <Button size="small" type="regular" colour="orange">
                            <span><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;Discard and go back</span>
                        </Button>
                    </Link>
                </Header>

                <div className="w-full p-8">

                    <div className="mb-10">
                        <div className="flex space-x-4">
                            <div className="grid rounded-full w-32 h-32 bg-silver my-auto">
                                <FontAwesomeIcon className="m-auto text-silver-dark text-6xl" icon={faUser} />
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
                        // TODO Form submission
                        const firstname = (firstnameRef.current as HTMLInputElement).value;
                        const lastname = (lastnameRef.current as HTMLInputElement).value;
                        const username = (usernameRef.current as HTMLInputElement).value;
                        const email = (emailRef.current as HTMLInputElement).value;
                        const group = (groupRef.current as HTMLSelectElement).value;
                        const job = (jobRef.current as HTMLSelectElement).value;
                        const accessLevel = (accessLevelRef.current as HTMLSelectElement).value;
                        alert(`TODO Submit form\n\n${firstname}\n${lastname}\n${username}\n${email}\n${group}\n${job}\n${accessLevel}`)
                    }}>

                        <div className="flex">
                            <TextInput ref={firstnameRef} className="w-1/2 pr-4" type="text" autoComplete="given-name" label="First name" name="firstname" required={true} minLength={1} maxLength={32} validator={(str: string) => /^[0-9a-zA-Z-]{1,32}$/.test(str)} onChange={() => {updatePreview();updateDefaultUsername();}} />
                            <TextInput ref={lastnameRef} className="w-1/2 pl-4" type="text" autoComplete="family-name" label="Last name" name="lastname" required={true} minLength={1} maxLength={32} validator={(str: string) => /^[0-9a-zA-Z-]{1,32}$/.test(str)} onChange={() => {updatePreview();updateDefaultUsername();}} />
                        </div>
                        <div className="flex">
                            <TextInput ref={usernameRef} className="w-1/2 pr-4" type="text" autoComplete="username" label="Username" name="username" required={true} minLength={3} maxLength={16} validator={(str: string) => /^[0-9a-zA-Z-]{3,16}$/.test(str)} onChange={updatePreview} />
                            <TextInput ref={emailRef} className="w-1/2 pl-4" type="email" autoComplete="email" label="Email address" name="email" required={true} validator={(str: string) => /\S+@\S+\.\S+/.test(str)} onChange={updatePreview} />
                        </div>
                        <div className="flex">
                            <Select ref={groupRef} className="w-1/3 pr-4" label="Group" required={true} onChange={updatePreview}>
                                <option>Clients</option>
                                <option>Debt recovery department</option>
                                <option>Human resources</option>
                                <option>Legal department</option>
                            </Select>
                            <Select ref={jobRef} className="w-1/3 px-2" label="Job title" required={true} onChange={updatePreview}>
                                <option>CEO</option>
                                <option>Debt Collection Officer</option>
                                <option>HR director</option>
                                <option>Individuals Litigation Collection Officer</option>
                                <option>Legal expert / Lawyer</option>
                            </Select>
                            <Select ref={accessLevelRef} className="w-1/3 pl-4" label="Access level" required={true}>
                                <option>1 - Guest</option>
                                <option>2 - User</option>
                                <option>3 - Administrator</option>
                            </Select>
                        </div>

                        <br />

                        <Button size="medium" type="regular" colour="blue" className="w-full">
                            Create user
                        </Button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default NewUser;