import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/sections/Header";
import Link from "next/link";
import Button from "../../components/buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUser, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Card from "../../components/containers/Card";
import {Heading2} from "../../components/text/Headings";
import {faCalendar, faFile, faFileWord} from "@fortawesome/free-regular-svg-icons";
import Badge from "../../components/Badge";
import User, {UserAccessLevel} from "../../model/User";
import TextInput from "../../components/inputs/TextInput";
import {request} from "../../helper/communication";
import getConfig from "next/config";
import {capitalize} from "../../util/string";
import {updateAccount} from "../../helper/processes";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import AutocompleteTextInput from "../../components/inputs/AutocompleteTextInput";
import {getGroupsJobsSuggestions} from "../../util/user";
import {GetStaticPaths, GetStaticProps} from "next";
import {useTranslations} from "use-intl";

function UserPage(): JSX.Element {

    const {publicRuntimeConfig} = getConfig();

    const t = useTranslations();

    const addToast = useContext(ToastContext);

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchUser = async (username: string) => {
        const response = await request("GET", `${publicRuntimeConfig.apiUrl}/users/${username}`, {});
        if (response.status === "SUCCESS") {
            const rawUser = response.data.user;
            setUser({
                username: rawUser.username,
                email: rawUser.email,
                firstName: rawUser.firstName,
                lastName: rawUser.lastName,
                profilePicture: null,
                job: rawUser.job || "Unknown",
                group: rawUser.group || "Unknown",
                accessLevel: rawUser.accessLevel
            });
        } else {
            setUser(null);
        }
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded && router.query.username)
            fetchUser(router.query.username as string).then(_ => {
            });
    });

    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLInputElement>(null);
    const jobRef = useRef<HTMLInputElement>(null);
    const accessLevelRef = useRef<HTMLInputElement>(null);


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
                <Header title={t("pages.user.details.title")}>
                    <Link href="/users" passHref>
                        <Button size="small" type="regular" colour="dark">
                            <span><FontAwesomeIcon icon={faArrowLeft}/>&nbsp;&nbsp;{t("pages.user.details.back")}</span>
                        </Button>
                    </Link>
                </Header>

                <ContentTransition>
                    <>
                        {loaded && user &&
                            <div className="w-full p-8 space-y-8">

                                {/* User summary */}
                                <Card className="p-10">
                                    <div className="flex">
                                        <div className="w-full">
                                            <div className="flex space-x-4">
                                                {user.profilePicture ?
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full w-24 lg:w-32 h-24 lg:h-32 my-auto"
                                                        style={{backgroundImage: `url(${user.profilePicture})`}}/>
                                                    :
                                                    <div
                                                        className="grid rounded-full w-24 lg:w-32 h-24 lg:h-32 bg-silver my-auto">
                                                        <FontAwesomeIcon
                                                            className="m-auto text-silver-dark text-4xl lg:text-6xl"
                                                            icon={faUser}/>
                                                    </div>
                                                }
                                                <div>
                                                    <p className="text-xl font-semibold text-txt-heading">{user.firstName} {user.lastName}</p>
                                                    <p>{user.job}, {user.group}</p>
                                                    <p className="text-txt-body align-bottom">{user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-80 text-right">
                                            <Badge text={capitalize(user.accessLevel)} size="small"
                                                   colour={user.accessLevel === UserAccessLevel.ADMINISTRATOR ? "orange" : (user.accessLevel === UserAccessLevel.USER ? "green" : "blue")}/>
                                            <br/><br/>
                                            <span className="text-txt-body">{t("pages.user.details.member-since")}</span><br/>
                                            <span className="text-txt-body">{t("pages.user.details.last-active")}</span>
                                        </div>
                                    </div>
                                </Card>

                                {/* User's files */}
                                <Card title={t("pages.user.details.files-table-title")} separator={false}>
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b border-grey-200 bg-bg-light text-3xs text-txt-body-lightmuted uppercase">
                                            <th className="w-5/10 font-semibold text-left px-6 py-4 space-x-3">
                                                <FontAwesomeIcon icon={faFile}/>
                                                <span>{t("generic.file.name")}</span>
                                            </th>
                                            <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                                <FontAwesomeIcon icon={faCalendar}/>
                                                <span>{t("generic.file.upload-date")}</span>
                                            </th>
                                            <th className="w-2/10 font-semibold text-left px-6 py-4 space-x-3">
                                                <FontAwesomeIcon icon={faUserFriends}/>
                                                <span>{t("generic.file.shared-with")}</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="overflow-y-scroll h-4/6">
                                        <tr className="border-b border-grey-200">
                                            <td className="py-2 px-4">
                                                <div className="flex space-x-3">
                                                    <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                        <FontAwesomeIcon className="m-auto text-silver-dark"
                                                                         icon={faFileWord}/>
                                                    </div>
                                                    <div className="grid content-center leading-4">
                                                        <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
                                                        <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="text-txt-body text-xs">
                                                    September 1, 2021
                                                </span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div className="flex">
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-grey-200">
                                            <td className="py-2 px-4">
                                                <div className="flex space-x-3">
                                                    <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                        <FontAwesomeIcon className="m-auto text-silver-dark"
                                                                         icon={faFileWord}/>
                                                    </div>
                                                    <div className="grid content-center leading-4">
                                                        <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
                                                        <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="text-txt-body text-xs">
                                                    September 1, 2021
                                                </span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div className="flex">
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-grey-200">
                                            <td className="py-2 px-4">
                                                <div className="flex space-x-3">
                                                    <div className="grid h-9 w-9 rounded-full bg-silver my-auto">
                                                        <FontAwesomeIcon className="m-auto text-silver-dark"
                                                                         icon={faFileWord}/>
                                                    </div>
                                                    <div className="grid content-center leading-4">
                                                        <span className="text-txt-heading font-semibold text-2xs">Creditor bank details.pdf</span>
                                                        <span className="text-txt-body-muted font-light text-4xs">PDF Document</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4">
                                                <span className="text-txt-body text-xs">
                                                    September 1, 2021
                                                </span>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div className="flex">
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="bg-cover bg-center w-9 h-9 rounded-full border-2 border-white -mr-3"
                                                        style={{backgroundImage: "url(https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60)"}}/>
                                                    <div
                                                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-tr from-silver-gradient-from to-silver-gradient-to text-2xs font-semibold text-txt-body tracking-tighter flex justify-center items-center">+4&nbsp;</div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Card>

                                {/* Edit user */}
                                <Card title={t("pages.user.details.edit-title")} separator={false}>
                                    <form className="space-y-2 m-6 pb-4" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const firstname = (firstnameRef.current as HTMLInputElement).value;
                                        const lastname = (lastnameRef.current as HTMLInputElement).value;
                                        const email = (emailRef.current as HTMLInputElement).value;
                                        const group = (groupRef.current as HTMLInputElement).value;
                                        const job = (jobRef.current as HTMLInputElement).value;
                                        const accessLevel = (accessLevelRef.current as HTMLInputElement).value.toUpperCase();

                                        const status = await updateAccount(user, firstname, lastname, email, group, job, accessLevel as UserAccessLevel);

                                        if (status === "SUCCESS")
                                            addToast({type: "success", title: "User updated", message: "Successfully updated user."});
                                        else if (status == "ERROR_EMAIL_ALREADY_USED")
                                            addToast({type: "warning", title: "Email already in use", message: "Failed to update account : Email already in use."});
                                        else
                                            addToast({type: "error", title: "Fail to update user", message: "An unknown error occurred while updating the account."});

                                        await fetchUser(user.username);
                                    }}>

                                        <div className="lg:flex">
                                            <TextInput ref={firstnameRef} className="lg:w-1/3 lg:pr-4" type="text"
                                                       autoComplete="given-name" label={t("generic.user.first-name")}
                                                       defaultValue={user.firstName} name="firstname" minLength={1}
                                                       maxLength={32}
                                                       validator={(str: string) => /^[0-9a-zA-Z-]{0,32}$/.test(str)}/>
                                            <TextInput ref={lastnameRef} className="lg:w-1/3 lg:px-2" type="text"
                                                       autoComplete="family-name" label={t("generic.user.last-name")}
                                                       defaultValue={user.lastName} name="lastname" minLength={1}
                                                       maxLength={32}
                                                       validator={(str: string) => /^[0-9a-zA-Z-]{0,32}$/.test(str)}/>
                                            <TextInput ref={emailRef} className="lg:w-1/3 lg:pl-4" type="email"
                                                       autoComplete="email" label={t("generic.user.email")} defaultValue={user.email}
                                                       name="email"
                                                       validator={(str: string) => str.length == 0 || /\S+@\S+\.\S+/.test(str)}/>
                                        </div>
                                        <div className="lg:flex">
                                            <AutocompleteTextInput ref={groupRef} defaultValue={user.group} containerClassName="lg:w-1/3 lg:pr-4" type="text" label={t("generic.user.group")} required={true} suggestions={suggestions[0]} />

                                            <AutocompleteTextInput ref={jobRef} defaultValue={user.job} containerClassName="lg:w-1/3 lg:px-2" type="text" label={t("generic.user.job")} required={true} suggestions={suggestions[1]} />

                                            <AutocompleteTextInput ref={accessLevelRef}  defaultValue={capitalize(user.accessLevel)} containerClassName="lg:w-1/3 lg:pl-4" type="text" label={t("generic.user.account-type")} required={true} suggestions={[
                                                "Guest",
                                                "User",
                                                "Administrator"
                                            ]} validator={(str: string) => {
                                                return ["GUEST", "USER", "ADMINISTRATOR"].includes(str.toUpperCase());
                                            }} />
                                        </div>

                                        <br/>

                                        <div className="text-right">
                                            <Button size="medium" type="regular" colour="blue">
                                                {t("generic.button.save")}
                                            </Button>
                                        </div>

                                    </form>
                                </Card>

                                {/* Delete user */}
                                <div className="flex space-x-6">
                                    <Card className="text-orange-light w-1/2" title={t("pages.user.details.suspend.title")} separator={false}>
                                        <div className="flex text-txt-body px-6 pb-6 pt-2">
                                            <div className="w-full">
                                                <span>
                                                    {t("pages.user.details.suspend.description")}
                                                </span>
                                            </div>
                                            <div className="w-96 text-center my-auto h-full">
                                                <Button size="medium" type="regular" colour="orange" onClick={() => {
                                                    addToast({type: "info", title: "Work in progress feature", message: "User suspension is currently a work-in-progress/planned feature."});
                                                }}>{t("pages.user.details.suspend.button")}</Button>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="text-red w-1/2" title={t("pages.user.details.delete.title")} separator={false}>
                                        <div className="flex text-txt-body px-6 pb-6 pt-2">
                                            <div className="w-full">
                                                <span>
                                                    {t("pages.user.details.delete.description")}
                                                </span>
                                            </div>
                                            <div className="w-96 text-center my-auto h-full">
                                                <Button size="medium" type="regular" colour="red" onClick={() => {
                                                    addToast({type: "info", title: "Work in progress feature", message: "User deletion is currently a work-in-progress/planned feature."});
                                                }}>{t("pages.user.details.delete.button")}</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                            </div>
                        }

                        {loaded && !user &&
                            <div className="w-full py-40">
                                <Card className="w-1/2 mx-auto my-auto">
                                    <div className="flex p-4">
                                        <div className="w-full p-10">
                                            <Heading2>User not found.</Heading2>
                                            <span className="text-txt-body">The user you are looking does not exists or has been deleted.</span>
                                        </div>
                                        <div className="p-12 bg-red-soft rounded-xl">
                                            <div className="w-full h-full flex justify-center">
                                                <Link href="/users" passHref>
                                                    <Button className="mx-auto my-auto w-24" size="medium" type="regular"
                                                            colour="red">Go back</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        }
                    </>
                </ContentTransition>


            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    };
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: require(`../../locales/${locale}.json`)
        }
    }
};

export default UserPage;
