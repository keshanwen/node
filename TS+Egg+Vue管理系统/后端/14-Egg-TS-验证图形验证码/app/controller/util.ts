import { Controller } from 'egg';
import svgCaptcha = require('svg-captcha');

export default class UtilController extends Controller {
    public async verifyImageCode(){
        const { ctx } = this;
        // 1.取出服务端中保存的验证码和过期时间
        const serverCaptcha = ctx.session.captcha;
        const serverCode = serverCaptcha.code;
        const serverExpire = serverCaptcha.expire;
        // 2.获取客户端传递过来的验证码
        const {clientCode} = ctx.query;
        // console.log(serverCode, serverExpire, clientCode);
        if(Date.now() > serverExpire){
            ctx.body = '验证码已经过期';
        }else if(serverCode !== clientCode){
            ctx.body = '验证码不正确';
        }else{
            ctx.body = '验证通过';
        }
    }
    public async imageCode() {
        const { ctx } = this;
        // 1.生成验证码
        const c = svgCaptcha.create({
            size: 4, // 验证码长度
            width:160,// 验证码图片宽度
            height:60,// 验证码图片高度
            fontSize: 50, // 验证码文字大小
            ignoreChars: '0oO1ilI', // 验证码字符中排除内容 0o1i
            noise: 4, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eee' // 验证码图片背景颜色
        });
        // 2.保存生成的验证码
        ctx.session.captcha = {
            code: c.text,
            expire: Date.now() + 60 * 1000 // 验证码1分钟之后过期
        };
        // 3.将验证码发送给客户端
        ctx.body = c.data;
    }
}
