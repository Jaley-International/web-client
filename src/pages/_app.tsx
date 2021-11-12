import "../styles/tailwind.css";
import Head from "next/head";
import App from "next/app";

class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        return (
            <>
                <Head>
                    <title>Private Encrypted Cloud</title>

                    <meta name="subject" content="Private Encrypted Cloud" />
                    <meta name="description" content="Self-managed and secure file hosting service" />
                    <meta name="author" content="JALEY International" />
                    <meta name="keywords" content="pec, private encrypted cloud, jaley international"/>
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://pec.ythepaut.com/" />
                    <meta property="og:title" content="Private Encrypted Cloud" />
                    <meta property="og:description" content="Self-managed and secure file hosting service" />
                    <meta property="og:image" content="/banner.png" />
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://pec.ythepaut.com/" />
                    <meta property="twitter:title" content="Private Encrypted Cloud" />
                    <meta property="twitter:description" content="Self-managed and secure file hosting service" />
                    <meta property="twitter:image" content="/banner.png" />
                </Head>
                <div>
                    <Component {...pageProps} />
                </div>
            </>
        );
    }
}

export default MyApp;
