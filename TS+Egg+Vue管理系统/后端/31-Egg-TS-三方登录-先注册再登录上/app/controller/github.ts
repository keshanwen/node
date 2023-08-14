import { Controller } from 'egg';
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';

export default class GithubController extends Controller {
    public async getLoginView() {
        // 1.获取第三方登录界面
        const baseURL = 'https://github.com/login/oauth/authorize';
        const option = {
            client_id: '018447869437696516f2',
            scope: 'user'
        }
        const url = baseURL + '?' + queryString.stringify(option);
        const {ctx} = this;
        ctx.redirect(url);
    }
    public async getAccessToken(){
        const {ctx} = this;
        // 1.拿到用户同意授权之后的code
        const {code} = ctx.query;
        // 2.利用code换取令牌(access_token)
        // 发送POST请求到https://github.com/login/oauth/access_token带上必要的参数
        const baseURL = 'https://github.com/login/oauth/access_token';
        const option = {
            client_id:'018447869437696516f2',
            client_secret:'a8d79ecf739b43c01014531c579904577931c83f',
            code:code
        }
        const result = await ctx.curl(baseURL, {
            method: 'POST',
            data: option,
            dataType: 'json',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        });
        const accessToken = result.data.access_token;
        // 3.拿着令牌去资源服务器获取数据
        await this.getGithubUserIinfo(accessToken);
    }
    private async getGithubUserIinfo(accessToken){
        // 获取用户信息
        const {ctx} = this;
        const baseURL = 'https://api.github.com/user';
        const url = `${baseURL}?access_token=${accessToken}`;
        const result = await ctx.curl(url, {
            method: 'GET'
        });
        const data = JSON.parse(result.data);
        data.provider = 'github';
        await this.go2Admin(data);
    }
    private async go2Admin(data){
        const {ctx} = this;
        try {
            // 用户存在直接登录
            const user = await ctx.service.oauth.getUser(data);
            const token = jwt.sign(user, this.config.keys, {expiresIn: '7 days'});
            ctx.cookies.set('token', token, {
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                // 注意点: 如果httpOnly: true, 那么前端是无法获取这个cookie
                httpOnly: false,
            });
            ctx.redirect('http://127.0.0.1:8080/admin');
        }catch (e) {
            // 用户不存在, 先注册再登录
            // 1.创建一个用户
            // ctx.body = uuidv4(); // dd171f66-f49d-4466-8884-f3f23746f643
            const data = {
                username: uuidv4() ,
                email:undefined, phone
                :undefined,
                password:'com.123456'
            }
            const user = await ctx.service.user.createUser(data);
            ctx.body = user;
            // 2.保存这个用户的授权信息
            // 3.直接登录(跳转到admin界面)
        }
    }
}
