import { Service } from 'egg';

/**
 * Test Service
 */
export default class Users extends Service {
    public async getAll() {
        return this.ctx.model.User.findAll();
    }
    public async createUser(obj){
        const {username, password, email, phone} = obj;
        obj.password = this.ctx.helper.encryptText(password);
        let user =  this.ctx.model.User.findOne({where:{username:username}});
        if(user){
            throw new Error('用户名已存在');
        }
        user =  this.ctx.model.User.findOne({where:{email:email}});
        if(user){
            throw new Error('邮箱已存在');
        }
        user =  this.ctx.model.User.findOne({where:{phone:phone}});
        if(user){
            throw new Error('手机已存在');
        }
        const data = await this.ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
}
