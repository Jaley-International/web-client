module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl: process.env.PEC_CLIENT_API_URL,
        instanceId: process.env.PEC_CLIENT_INSTANCE_ID
    }
};
