// 我去洗澡店洗澡 
const Koa = require('koa'); // 原生的 同构项目 会使用cookie session  （nuxtjs）
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();
const uuid = require('uuid')
app.use(router.routes());
// session需要持久化存储，否则丢失后就没有了。 如果我期望把当前的用户的信息进行共享
const session = {}; // 服务端的session  可以采用redis存储session
app.keys = ['zfjg']

const cardName = 'zhufengwash'
router.get('/wash', async (ctx, next) => {
    let cardId = ctx.cookies.get(cardName); // 就意味着你有没有来过
    if(cardId && session[cardId]){
        session[cardId].mny -= 10;
        ctx.body = `您还有${session[cardId].mny}元`
    }else{
        let cardId = uuid.v4();
        session[cardId] = {mny:100};
        ctx.cookies.set(cardName,cardId,{httpOnly:true,signed:true});
        ctx.body = '您充值了 100 元'
    }
})
app.listen(3000, () => {
    console.log(`server start 3000`)
})
// jwt json web token (好处就是服务器什么都不需要存储) 前后端分离的 我们不采用cookie ，会采用token的方式