import React, {useContext, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Display6} from "../../components/text/Displays";
import {Heading2, Heading3} from "../../components/text/Headings";
import TextInput from "../../components/inputs/TextInput";
import Button from "../../components/buttons/Button";
import Checkbox from "../../components/inputs/Checkbox";
import {register} from "../../helper/processes";
import NewPasswordInput from "../../components/inputs/NewPasswordInput";
import Link from "next/link";
import {useRouter} from "next/router";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import {GetStaticProps} from "next";
import {useTranslations} from "use-intl";

function RegisterPage(): JSX.Element {

    const addToast = useContext(ToastContext);

    const t = useTranslations();

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
        <section className="flex">
            <div className="hidden lg:inline flex-auto w-5/12 bg-blue-soft">
                <div className="p-12 h-12 inline-flex space-x-3 bg-blue w-full">
                    <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-silver-gradient-from to-silver-gradient-to text-center text-2lg text-blue py-1">
                        <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                    </div>
                    <Heading3 className="text-txt-heading-light h-12 py-2">{t("generic.app.name")}</Heading3>
                </div>

                <div className="py-52 px-20 xl:px-28 pt-48 bg-blue">
                    <Display6 className="text-txt-heading-light leading-tight">{t("generic.app.moto")}</Display6>
                    <br />
                    <span className="text-txt-body-light">{t("pages.auth.register.description")}</span>
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
            <ContentTransition className="flex-auto w-7/12 min-h-screen bg-bg-light">

                <div className="px-8 md:px-20 lg:px-36 xl:px-48">

                    <div className="my-12 h-12 inline-flex space-x-3 lg:invisible">
                        <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-txt-heading-light py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="hidden md:flex text-blue h-12 py-2">{t("generic.app.name")}</Heading3>
                        <Heading3 className="flex md:hidden text-blue h-12 py-2">{t("generic.app.abbr")}</Heading3>
                    </div>

                    <Heading2>{t("pages.auth.register.title")}</Heading2>
                    <span className="text-txt-heading">{t("pages.auth.register.sub-description")}</span>

                    <form className="py-10 space-y-7" onSubmit={async (e) => {
                        e.preventDefault();
                        if (!submitting) {
                            setSubmitting(true);

                            const updateStatus = (message: string) => {
                                if (submitRef.current)
                                    submitRef.current.innerText = message;
                            }

                            const statusCode = await register(registerKeyRef.current?.value as string, passwordRef.current?.value as string, updateStatus);
                            if (statusCode === "SUCCESS") {
                                addToast({type: "success", title: t("pages.auth.register.toast.success.title"), message: t("pages.user.list.toast.success.message")});
                                router.push("/auth").then(() => {});
                            } else if (statusCode === "ERROR_INVALID_REGISTER_KEY") {
                                addToast({type: "warning", title: t("pages.auth.register.toast.invalid.title"), message: t("pages.user.list.toast.invalid.message")});
                            } else {
                                addToast({type: "error", title: t("pages.auth.register.toast.error.title"), message: t("pages.user.list.toast.error.message")});
                            }
                            updateStatus("Register");
                            setSubmitting(false);

                            (passwordRef.current as HTMLInputElement).value = "";
                            (passwordConfirmRef.current as HTMLInputElement).value = "";
                        }
                    }}>
                        <TextInput ref={registerKeyRef} type="text" label={t("pages.auth.register.form.registration-key")} defaultValue={registrationKey} name="registerKey" hint={t("pages.auth.register.form.registration-key-hint")} autoFocus={true} required={true} disabled={submitting} minLength={16} maxLength={16} validator={(str: string) => /^[0-9a-zA-Z-_]{16}$/.test(str)} />
                        <NewPasswordInput ref={passwordRef} label={t("pages.auth.register.form.password")} name="password" required={true} disabled={submitting} />
                        <TextInput ref={passwordConfirmRef} type="password" autoComplete="new-password" label={t("pages.auth.register.form.confirm-password")} name="password2" hint={t("pages.auth.register.form.confirm-password-hint")} required={true} disabled={submitting} validator={(str: string) => str === passwordRef.current?.value} onChange={() => passwordRef.current?.value !== passwordConfirmRef.current?.value ? passwordConfirmRef.current?.setCustomValidity("Passwords don't match.") : passwordConfirmRef.current?.setCustomValidity("")} />
                        <Checkbox ref={tosRef} name="tos" check={false} required={true} disabled={submitting}>
                            <span className="text-txt-body">
                                {t.rich("pages.auth.register.agreement", {
                                    terms: (children => <a href="#" className="font-semibold">{children}</a>),
                                    privacy: (children => <a href="#" className="font-semibold">{children}</a>)
                                })}
                            </span>
                        </Checkbox>
                        <Button ref={submitRef} size="large" type="regular" colour="blue" className={`w-full${submitting ? " animate-pulse" : ""}`} disabled={submitting}>
                            {t("pages.auth.register.register")}
                        </Button>
                        <br />
                        <p className="text-center text-txt-body-muted text-2xs">
                            {t.rich("pages.auth.register.login-link", {
                                link: (children => <Link href="/auth"><a className="text-blue">{children}</a></Link>)
                            })}
                        </p>
                    </form>
                </div>
            </ContentTransition>
        </section>
    );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            messages: require(`../../locales/${locale}.json`)
        }
    }
};

export default RegisterPage;
