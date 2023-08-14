import { Controller } from 'egg';
export default class UserRoleController extends Controller {
    public async create() {
        const {ctx} = this;
        const data = ctx.request.body;
        try {
            const user = await ctx.service.userRole.createUserRole(data);
            ctx.success(user);
        } catch (e) {
            ctx.error(400, e.message);
        }
    }
}
