import { Service } from 'egg';


export default class UserRole extends Service {

    public async createUserRole(obj) {
        try {
            const data = await this.ctx.model.UserRole.create(obj);
            const userRoleData = data['dataValues'];
            return userRoleData;
        }catch (e) {
            throw new Error('分配角色失败');
        }
    }
}
