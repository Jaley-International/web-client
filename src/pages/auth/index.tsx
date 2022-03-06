import React, {useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Display6} from "../../components/text/Displays";
import {Heading2, Heading3} from "../../components/text/Headings";
import TextInput from "../../components/inputs/TextInput";
import Button from "../../components/buttons/Button";
import Link from 'next/link';
import {authenticate, AuthenticationStep, RegisterStep} from "../../helper/processes";
import {useRouter} from "next/router";
import {removeCookies} from "cookies-next";
import ToastContext from "../../contexts/ToastContext";
import ContentTransition from "../../components/sections/ContentTransition";
import {useTranslations} from "use-intl";
import {GetStaticProps} from "next";

function LoginPage(): JSX.Element {

    const router = useRouter();
    const addToast = useContext(ToastContext);

    const t = useTranslations();

    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        if (window && !loaded) {
            setLoaded(true);
            removeCookies("session");
            localStorage.clear();
        }
    }, [loaded]);


    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
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
                    <span className="text-txt-body-light">{t("pages.auth.login.description")}</span>
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

                    <div className="my-28 h-12 inline-flex space-x-3 lg:invisible">
                        <div className="w-12 h-12 rounded-2lg bg-gradient-to-bl from-blue-gradient-from to-blue-gradient-to text-center text-2lg text-txt-heading-light py-1">
                            <FontAwesomeIcon icon={faCloud} /> {/* TODO Change icon */}
                        </div>
                        <Heading3 className="hidden md:flex text-blue h-12 py-2">{t("generic.app.name")}</Heading3>
                        <Heading3 className="flex md:hidden text-blue h-12 py-2">{t("generic.app.abbr")}</Heading3>
                    </div>

                    <Heading2>{t("pages.auth.login.title")}</Heading2>
                    <span className="text-txt-heading">{t("pages.auth.login.sub-description")}</span>

                    <form className="py-10 space-y-7" onSubmit={async (e) => {
                        e.preventDefault();
                        if (!submitting) {
                            setSubmitting(true);

                            const updateStatus = (message: string) => {
                                if (submitRef.current)
                                    submitRef.current.innerText = message;
                            }

                            const username = usernameRef.current?.value as string;
                            const password = passwordRef.current?.value as string;

                            // Authentication request
                            const success = await authenticate(username, password, (step: AuthenticationStep) => {
                                if (step === AuthenticationStep.REQ_SALT)
                                    updateStatus(t("pages.auth.login.form.button.req-salt"));
                                else if (step === AuthenticationStep.PROCESSING_PASSWORD)
                                    updateStatus(t("pages.auth.login.form.button.processing-password"));
                                else if (step === AuthenticationStep.REQ_KEYS)
                                    updateStatus(t("pages.auth.login.form.button.req-keys"));
                                else if (step === AuthenticationStep.DECRYPTING_KEYS)
                                    updateStatus(t("pages.auth.login.form.button.decrypting-keys"));
                            });

                            if (success) {
                                updateStatus(t("pages.auth.login.redirecting"));
                                addToast({type: "success", title: t("pages.auth.login.toast.success.title"), message: t("pages.auth.login.toast.success.message")});
                                router.push("/files").then(_ => {});
                            } else {
                                updateStatus(t("pages.auth.login.login"));
                                setSubmitting(false);
                                addToast({type: "warning", title: t("pages.auth.login.toast.error.title"), message: t("pages.auth.login.toast.error.message")});
                            }
                            (passwordRef.current as HTMLInputElement).value = "";
                        }
                    }}>
                        <TextInput ref={usernameRef} type="text" autoComplete="username" label={t("pages.auth.login.form.username")} name="username" autoFocus={true} required={true} disabled={submitting} minLength={3} maxLength={16} validator={(str: string) => /^[0-9a-zA-Z-]{3,16}$/.test(str)} />
                        <TextInput ref={passwordRef} type="password" autoComplete="password" label={t("pages.auth.login.form.password")} name="password" required={true} disabled={submitting} />
                        <Button ref={submitRef} size="large" type="regular" colour="blue" disabled={submitting} className={`w-full${submitting ? " animate-pulse" : ""}`}>
                            {t("pages.auth.login.login")}
                        </Button>
                        <br />
                        <p className="text-center text-txt-body-muted text-2xs">
                            {t.rich("pages.auth.login.register-link", {
                                link: (children => <Link href="/auth/register"><a className="text-blue">{children}</a></Link>)
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

export default LoginPage;
