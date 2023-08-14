import { Service } from 'egg';
const { Op } = require("sequelize");

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
    public async getUserList(obj){
        const currentPage = parseInt(obj.currentPage) || 1;
        const pageSize = parseInt(obj.pageSize) || 5;
        const {role, origin, type, key} = obj;
        const defaultCondition = {
            [Op.or]: [
                {username:{[Op.substring]: key}},
                {email:{[Op.substring]: key}},
                {phone:{[Op.substring]: key}},
            ],
        };
        if(key && !role && !origin && !type){
            // 只有搜索的关键字, 那么就需要把包含这个关键的所有类型的用户都查询出来
            const users = await this.ctx.model.User.findAll({
                attributes:{
                    exclude:['password', 'created_at', 'updated_at']
                },
                limit: pageSize,
                offset: (currentPage - 1) * pageSize,
                where: defaultCondition
            });
            const totalCount = await this.ctx.model.User.findAndCountAll({
                where: defaultCondition
            });
            return {users:users, totalCount:totalCount.count};
        }else if(key || role || origin || type){
            // 如果有附加条件, 那么就必须同时满足多个条件
            const conditionList:any[] = [];
            if(key){
                conditionList.push(defaultCondition);
            }
            if(role){

            }
            if(origin){
                // {github: true}
                // {local: true}
                conditionList.push({[origin]:true});
            }
            if(type){
                // {username: {[Op.substring]: 123}}
                // {email: {[Op.substring]: 123}}
                // {phone: {[Op.substring]: 123}}
                conditionList.push({[type]:{[Op.substring]: key}});
            }
            const users = await this.ctx.model.User.findAll({
                attributes:{
                    exclude:['password', 'created_at', 'updated_at']
                },
                limit: pageSize,
                offset: (currentPage - 1) * pageSize,
                where: {
                    [Op.and]:conditionList
                }
            });
            const totalCount = await this.ctx.model.User.findAndCountAll({
                where: {
                    [Op.and]:conditionList
                }
            });
            return {users:users, totalCount:totalCount.count};
        }else{
            const users = await this.ctx.model.User.findAll({
                attributes:{
                    exclude:['password', 'created_at', 'updated_at']
                },
                limit: pageSize,
                offset: (currentPage - 1) * pageSize
                //      (1 - 1) * 5 = 0
                //      (2 - 1) * 5 = 5
            });
            const totalCount = await this.ctx.model.User.findAndCountAll();
            return {users:users, totalCount:totalCount.count};
        }
    }
    public async createUser(obj){
        const {username, password, email, phone} = obj;
        obj.password = this.ctx.helper.encryptText(password);
        let user;
        if(username){
            user =  await this.ctx.model.User.findOne({where:{username:username}});
            if(user){
                throw new Error('用户名已存在');
            }
        }else{
            delete obj.username;
        }
        if(email){
            user =  await this.ctx.model.User.findOne({where:{email:email}});
            if(user){
                throw new Error('邮箱已存在');
            }
        }else{
            delete obj.email;
        }
        if(phone){
            user =  await this.ctx.model.User.findOne({where:{phone:phone}});
            if(user){
                throw new Error('手机已存在');
            }
        }else{
            delete obj.phone;
        }
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
