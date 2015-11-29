module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
        "api/",
        "config/locales",
        "views/"
    ],
    ignored: [
        // Ignore all files with .ts extension
        "**.ts"
    ]
};