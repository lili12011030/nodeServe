module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    router.get('/captcha',controller.util.captcha)

    router.group({ name: 'users', prefix: '/users' }, router => {

        const {
            register, login,
        } = controller.user
        router.post('/register', register)
        router.post('/login', login)

    })




};
