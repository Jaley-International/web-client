module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl: process.env.PEC_CLIENT_API_URL
    },
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en"
    }
};
