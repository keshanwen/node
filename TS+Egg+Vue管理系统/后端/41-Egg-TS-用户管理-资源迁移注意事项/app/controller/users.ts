import { Controller } from 'egg';
import AddUserRule from '../validate/addUserRule'
import EditUserRule from '../validate/editUserRule'

export default class UsersController extends Controller {
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
            console.log(data);
            // 1.校验数据和验证码
            ctx.validate(AddUserRule, data);
            // 2.将校验通过的数据保存到数据库中
            const user = await ctx.service.users.createUser(data);
            ctx.success(user);
        } catch (e) {
            if (e.errors) {
                ctx.error(400, e.errors);
            } else {
                ctx.error(400, e.message);
            }
        }
    }
    public async destroy(){
        const {ctx} = this;
        const {id} = ctx.params;
        try {
            const user = await ctx.service.users.destroyUser(id);
            ctx.success(user);
        } catch (e) {
            ctx.error(400, e.message);
        }
    }
    public async update(){
        const {ctx} = this;
        const {id} = ctx.params;
        const data = ctx.request.body;
        try {
            // 1.校验数据和验证码
            ctx.validate(EditUserRule, data);
            // 2.将校验通过的数据保存到数据库中
            const user = await ctx.service.users.updateUser(id, data);
            ctx.success(user);
        } catch (e) {
            if (e.errors) {
                console.log(e.errors, '----------');
                ctx.error(400, e.errors);
            } else {
                ctx.error(400, e.message);
            }
        }
    }
}
