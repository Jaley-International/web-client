module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl: process.env.PEC_CLIENT_API_URL,
        instanceId: process.env.PEC_CLIENT_INSTANCE_ID,
        instancePublicKey: process.env.PEC_INSTANCE_PUBLIC_KEY
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en"
    }
};
