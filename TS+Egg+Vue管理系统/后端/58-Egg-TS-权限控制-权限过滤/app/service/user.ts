import { Service } from 'egg';
import {Role} from '../model/role';
import {Rights} from '../model/rights';

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
            // 注意点: 在sequelize中, 如果想返回虚拟字段的值, 那么就不能从dataValues中获取
            //          dataValues中保存的都是从数据库中查询到的数据
            return res;
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
        const user:any =  await this.ctx.model.User.findOne({
            where: options,
            include:[
                {
                    model:Role,
                    include:[
                        { model:Rights }
                    ]
                }
            ],
        });
        // 1.获取当前登录用户拥有的所有权限
        let allRights:any[] = [];
        user.roles.forEach((role)=>{
            role.rights.forEach((item)=>{
                allRights.push(item);
            });
        });
        // 2.剔除重复的权限
        /*
        {id: 1, rightsName: '权限管理', rightsType:'menu'},
        {id: 2, rightsName: '角色列表', rightsType:'menu'},
        {id: 3, rightsName: '权限列表', rightsType:'menu'},
        {id: 4, rightsName: '权限管理', rightsType:'router'},
        {id: 5, rightsName: '角色列表', rightsType:'router'},
        {id: 6, rightsName: '权限列表', rightsType:'router'},
        {id: 7, rightsName: '权限管理', rightsType:'menu'},

         const temp = {
            权限管理:true
         };
        * */
        const temp = {};
        allRights = allRights.reduce((arr, item)=>{
            if(!temp[item.dataValues.id]){
                arr.push(item);
                temp[item.dataValues.id] = true;
            }
            return arr;
        }, []);
        // 3.生成权限树
        allRights = allRights.filter((outItem)=>{
            allRights.forEach((inItem)=>{
                if(outItem.dataValues.id === inItem.dataValues.pid){
                    outItem.dataValues.children ? '' : outItem.dataValues.children = [];
                    outItem.dataValues.children.push(inItem);
                }
            });
            if(outItem.dataValues.level === 0) return true;
        });
        user.dataValues.rightsTree = allRights;
        return user;
    }
}
