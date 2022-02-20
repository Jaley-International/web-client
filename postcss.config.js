module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.PEC_CLIENT_MODE === "production" ? { cssnano: {} } : {})
    }
}
