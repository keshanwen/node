import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
    public async getUser({username, email, phone, password}){
        password = this.ctx.helper.encryptText(password);
        let res;
        if(email){
            res = await this.findUser({email:email, password:password});
        }else if(phone){
            res = await this.findUser({phone:phone, password:password});
        }else if(username){
            res = await this.findUser({username:username, password:password});
        }
        try {
            return res.dataValues;
        }catch (e) {
            throw new Error('用户名或者密码不正确');
        }
    }
    public async createUser(obj) {
        const {username, email, phone, password} = obj;
        obj.password = this.ctx.helper.encryptText(password);
        if(username){
            // 普通注册
            return await this.createUserByUserName(username, obj);
        }else if(email){
            // 邮箱注册
            return await this.createUserByEmail(email, obj);
        }else if(phone){
            // 手机注册
            return await this.createUserByPhone(phone, obj);
        }
    }
    private async createUserByUserName(username, obj){
        // 1.查询当前用户是否存在
        const user = await this.findUser({username:username});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
    private async createUserByEmail(email, obj){
        // 1.查询当前用户是否存在
        const user = await this.findUser({email:email});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
    private async createUserByPhone(phone, obj){
        // 1.查询当前用户是否存在
        const user = await this.findUser({phone:phone});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
    private async findUser(options){
        return await this.ctx.model.User.findOne({where: options});
    }
}
