const BaseController = require('./base')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const createRule = {
    email: { type: 'email' },
    nickname: { type: 'string' },
    passwd: { type: 'string' },
    captcha: { type: 'string' },
}
const HashSalt = 'teshuderena'
class UserController extends BaseController {
    async login() {
        const { ctx, app } = this
        const { email, captcha, passwd, emailcode } = ctx.request.body
        if(captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
            return this.error('验证码错误')
        }
        if (emailcode !== ctx.session.emailcode) {
            return this.error('邮箱验证码错误')
        }
        const user = await ctx.model.user.findOne({
            email,
            passwd: md5(passwd + HashSalt),
        })
        if(!user) {
            return this.error('用户名密码错误')
        }

        // 用户的信息加密成token 返回
        const token = jwt.sign({
            _id: user._id,
            email,
        }, app.config.jwt.secret, {
            expiresIn: '100h',
        })
        this.success({ token, email, nickname: user.nickname })

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
