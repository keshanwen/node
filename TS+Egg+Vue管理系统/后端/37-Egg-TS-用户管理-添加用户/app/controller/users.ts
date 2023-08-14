import { Controller } from 'egg';
import AddUserRule from '../validate/addUserRule'

export default class UserController extends Controller {
    public async index() {
        const { ctx } = this;
        try {
            const users = await ctx.service.users.getAll();
            ctx.success(users);
        }catch (e) {
            ctx.error(500, e.message);
        }
    }
    public async create(){
        const {ctx} = this;
        const data = ctx.request.body;
        try {
            // 1.校验数据和验证码
            ctx.validate(AddUserRule, data);
            // 2.将校验通过的数据保存到数据库中
            const user = await ctx.service.users.createUser(ctx.request.body);
            ctx.success(user);
        } catch (e) {
            if (e.errors) {
                ctx.error(400, e.errors);
            } else {
                ctx.error(400, e.message);
            }
        }
    }
}
