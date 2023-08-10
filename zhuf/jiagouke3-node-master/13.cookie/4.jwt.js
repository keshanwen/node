const Koa = require('koa');
const Router = require('@koa/router');
const body = require('koa-bodyparser');
// const jwt = require('jwt-simple');
// jsonwebtoken 开发时使用这个模块 功能强大
const app = new Koa();
const router = new Router();
app.use(body());
app.use(router.routes());


const jwt = {
    sign(content, secret) {
        return this.toBase64URL(require('crypto').createHmac('sha256', secret).update(content).digest('base64'))
    },
    toBase64URL(str) {
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/-/g, '+').replace(/_/g, '/');
     },
    toBase64(content) {
        if (typeof content == 'object') {
            content = JSON.stringify(content);
        }
        console.log(content)
        return this.toBase64URL(Buffer.from(content).toString('base64')); // + ->  '-' / => '_' = ''
    },
    encode(data, secret) {
        const part1 = this.toBase64({ typ: 'JWT', alg: 'HS256' }) // sha256
        const part2 = this.toBase64(data);
        const part3 = this.sign(part1 + '.' + part2, secret);
        return part1 + '.' + part2 + '.' + part3
    },
    decode(data, sercet) {
        let [part1,part2,part3] = data.split('.');
        let newSign = this.sign(part1 + '.' + part2,sercet);
        if(newSign === part3){ // 令牌是我发给你的
           return JSON.parse( Buffer.from( this.base64urlUnescape(part2),'base64').toString());
        }else{
            throw new Error('令牌有篡改')
        }
    }
}

router.post('/login', async (ctx, next) => {
    let { username, password } = ctx.request.body;
    if (username == password) {
        ctx.body = {
            err: 0,
            data: '登录成功', // 需要给用户一个token
            token: jwt.encode({ username: 123 }, 'zfjg')
            // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6MTIzfQ.kcOfNF0q-ldOG9ITmemLWnAChIirjs04RfRR6vvhsRw
            // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6MTIzfQ.kcOfNF0q-ldOG9ITmemLWnAChIirjs04RfRR6vvhsRw
        }
    } else {
        ctx.body = {
            err: 1,
            data: '用户名密码不一致'
        }
    }
})
router.get('/validate',async (ctx, next)=>{
    let token = ctx.get('authorization')
    token && (token = token.split(' ')[1]);
    try{
        let r = jwt.decode(token,'zfjg');
        ctx.body = {
            err:0,
            data:'用户已经登录' + r.username
        }
    }catch{
        ctx.body = {
            err:1,
            data:'令牌不正确'
        }
    }

})



app.listen(3000, () => {
    console.log(`server start 3000`)
})