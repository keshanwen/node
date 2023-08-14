import { Service } from 'egg';

/**
 * Test Service
 */
export default class Users extends Service {
    public async getAll() {
        return this.ctx.model.User.findAll({
            attributes:{
                exclude:['password', 'created_at', 'updated_at']
            }
        });
    }
    public async createUser(obj){
        const {username, password, email, phone} = obj;
        obj.password = this.ctx.helper.encryptText(password);
        let user =  await this.ctx.model.User.findOne({where:{username:username}});
        if(user){
            throw new Error('用户名已存在');
        }
        user =  await this.ctx.model.User.findOne({where:{email:email}});
        if(user){
            throw new Error('邮箱已存在');
        }
        user =  await this.ctx.model.User.findOne({where:{phone:phone}});
        if(user){
            throw new Error('手机已存在');
        }
        obj.username ? '' : delete obj.username;
        obj.password ? '' : delete obj.password;
        obj.email ? '' : delete obj.email;
        obj.phone ? '' : delete obj.phone;
        const data = await this.ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
    public async destroyUser(id){
        const user = await this.ctx.model.User.findByPk(id);
        if(user){
            const data = await this.ctx.model.User.destroy({
                where:{id:id}
            });
            if(data > 0){
                return user;
            }else{
                throw new Error('删除用户失败');
            }
        }else{
            throw new Error('删除的用户不存在');
        }
    }
    public async updateUser(id, obj){
        const user = await this.ctx.model.User.findByPk(id);
        if(user){
            obj.username ? '' : delete obj.username;
            obj.password ? '' : delete obj.password;
            obj.email ? '' : delete obj.email;
            obj.phone ? '' : delete obj.phone;
            const data = await this.ctx.model.User.update(obj, {
                where:{
                    id:id
                }
            });
            console.log('更新返回的结果',data);
            if(data.length > 0){
                return user;
            }else{
                throw new Error('更新用户失败');
            }
        }else{
            throw new Error('更新的用户不存在');
        }
    }
}
