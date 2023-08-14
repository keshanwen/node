import { Controller } from 'egg';

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
}
