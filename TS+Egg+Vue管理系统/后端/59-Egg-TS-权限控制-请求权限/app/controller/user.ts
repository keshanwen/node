import {Controller} from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/phoneUserRule'
const jwt = require('jsonwebtoken');

const enum TypeEnum {
    Normal = 'normal',
    Email = 'email',
    Phone = 'phone'
}
export default class UserController extends Controller {

    public async index() {
        const {ctx} = this;
        try {
            // 1.校验数据和验证码
            this.validateUserInfo();
            const data = ctx.request.body;
            ctx.helper.verifyImageCode(data.captcha);
            // 2.将校验通过的数据保存到数据库中
            const user = await ctx.service.user.getUser(data);
            delete user.password;
            // 校验用户是否可用
            if(!user.userState){
                return ctx.error(400, '用户已经注销');
            }
            // 3.生成JWT令牌
            const obj:any = {};
            obj.username = user.username;
            obj.email = user.email;
            obj.phone = user.phone;
            const token = jwt.sign(obj, this.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
                signed:false,
            });
            ctx.session.user = user;
            ctx.success(user);
        } catch (e) {
            if (e.errors) {
                ctx.error(400, e.errors);
            } else {
                ctx.error(400, e.message);
            }
        }
    }

    public async create() {
        const {ctx} = this;
        try {
            // 1.校验数据和验证码
            this.validateUserInfo();
            this.validateUserCode();
            // 2.将校验通过的数据保存到数据库中
            const data = await ctx.service.user.createUser(ctx.request.body);
            ctx.success(data);
        } catch (e) {
            if (e.errors) {
                ctx.error(400, e.errors);
            } else {
                ctx.error(400, e.message);
            }
        }
    }

    private validateUserCode() {
        const {ctx} = this;
        const data = ctx.request.body;
        const type = data.type;
        switch (type) {
            case TypeEnum.Normal:
                // 校验当前的验证码是否正确
                ctx.helper.verifyImageCode(data.captcha);
                break;
            case TypeEnum.Email:
                ctx.helper.verifyEmailCode(data.captcha);
                break;
            case TypeEnum.Phone:
                ctx.helper.verifySmsCode(data.captcha);
                break;
            default:
                throw new Error('注册类型不存在');
        }
    }
    private validateUserInfo() {
        const {ctx} = this;
        const data = ctx.request.body;
        const type = data.type;
        switch (type) {
            case TypeEnum.Normal:
                // 校验数据的格式是否正确
                ctx.validate(NormalUserRule, data);
                break;
            case TypeEnum.Email:
                ctx.validate(EmailUserRule, data);
                break;
            case TypeEnum.Phone:
                ctx.validate(PhoneUserRule, data);
                break;
            default:
                throw new Error('注册类型不存在');
        }
    }
}
