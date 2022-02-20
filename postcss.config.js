module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.PEC_API_MODE === 'production' ? { cssnano: {} } : {})
    }
}
