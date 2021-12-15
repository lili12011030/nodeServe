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
        mongoose: {
            client: {
                url: 'mongodb://127.0.0.1:27017/test',
                options: {},
            },
        },
        jwt: {
            secret: '@Kaikeba!123Abc!:',
        },
    }

}
