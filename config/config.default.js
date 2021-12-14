module.exports = appInfo =>{
    const config = exports = {}
    config.keys = 'li140224'
    return {
        ...config,
        security: {
            csrf: {
                enable: false,
            },
        },
    }

}
