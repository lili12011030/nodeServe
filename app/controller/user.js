const BaseController = require('./base')
const createRule = {
    email: { type: 'email' },
    nickname: { type: 'string' },
    passwd: { type: 'string' },
    captcha: { type: 'string' },
}
class UserController extends BaseController {
    async login() {
        const { ctx } = this
        const { email, passwd } = ctx.request.body

    }

    async register() {
        const { ctx } = this
        try {
            // 校验传递的参数
            ctx.validate(createRule)
        } catch (e) {
            return this.error('参数校验失败', -1, e.errors)
        }

        const { email, passwd, nickname, captcha } = ctx.request.body

        if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
            return this.error('验证码错误')
        }
        if (await this.checkEmail(email)) {
            this.error('邮箱重复啦')
        } else {
            const ret = await ctx.model.User.create({
                email,
                nickname,
                passwd: md5(passwd + HashSalt),
            })
            if (ret._id) {
                this.message('注册成功')
            }
        }

    }
    async checkEmail(email) {
        const user = await this.ctx.model.User.findOne({ email })
        return user
    }
}
module.exports = UserController
