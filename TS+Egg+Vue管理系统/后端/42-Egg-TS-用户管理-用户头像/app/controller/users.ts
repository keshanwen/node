import { Controller } from 'egg';
import AddUserRule from '../validate/addUserRule'
import EditUserRule from '../validate/editUserRule'
const path = require('path');
const fs = require('fs');

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
    public async posts(){
        const {ctx} = this;
        // 1.拿到上传过来的文件
        // 注意点: 在Egg中想要实现文件上传, 必须进行配置
        /*
        Egg的文件上传分为两种模式: File Mode / Stream Mode
        这两种模式的区别: 文件模式会先将前端传递过来的数据写入到缓存中, 然后再返回给我们
                          文件模式相对比较简单, 但是如果数据量较大, 它的性能会差一些
                          数据流模式不会先将前端传递过来的数据写入到缓存中
                          数据流模式相对比复杂一点, 但是如果数据量较大, 它的性能会好一些
        * */
        const file =  ctx.request.files[0];
        // 2.生成一个独一无二的文件名称
        const fileName =  ctx.helper.encryptText(file.filename + Date.now()) + path.extname(file.filename);
        // 3.生成存储文件的路径
        let filePath = path.join('/public/upload', fileName);
        const absFilePath = path.join(this.config.baseDir, 'app', filePath);
        // 4.写入文件
        const readStream =  fs.readFileSync(file.filepath);
        fs.writeFileSync(absFilePath, readStream);
        // 5.返回存储图片的路径
        filePath = filePath.replace(/\\/g, '/');
        ctx.success(filePath);
    }
}
