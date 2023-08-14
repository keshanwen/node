<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--内容卡片区域-->
        <el-card class="box-card">
            <!--头部搜索区域-->
            <el-row>
                <el-col :span="20">
                    <el-form :inline="true" :model="searchData" class="demo-form-inline">
                        <el-form-item label="">
                            <el-select v-model="searchData.role" placeholder="-所有角色-">
                                <el-option label="管理员" value="manger"></el-option>
                                <el-option label="普通用户" value="normal"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="searchData.origin" placeholder="-所有来源-">
                                <el-option label="本地注册" value="local"></el-option>
                                <el-option label="Github登录" value="github"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="searchData.type" placeholder="-所有用户-">
                                <el-option label="用户名" value="username"></el-option>
                                <el-option label="邮箱" value="email"></el-option>
                                <el-option label="手机" value="phone"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="searchData.key" placeholder="关键字"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button type="primary" @click="exportUsers">导出搜索结果</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddUserDialog">添加用户</el-button>
                    <el-button type="primary" @click="importUsers">导入用户</el-button>
                </el-col>
            </el-row>
            <!--中间表格区域-->
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :border="true"
                    :stripe="true">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        label="角色">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <!-- {{scope.row.userState}}-->
                        <el-switch
                                v-model="scope.row.userState"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showEditUserDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="destroyUser(scope.row.id)"></el-button>
                        <el-button type="warning" icon="el-icon-setting"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!--底部分页区域-->
        <el-pagination
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>

        <!--添加用户对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addUserDialogVisible"
                width="30%">
            <el-form ref="form" :model="userData" :rules="addUserRules" label-width="0px">
                <el-form-item label="" prop="username">
                    <el-input v-model="userData.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input v-model="userData.email" prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item label="" prop="phone">
                    <el-input v-model="userData.phone" prefix-icon="el-icon-phone-outline"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="userData.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createUser">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑用户对话框-->
        <el-dialog
                title="编辑用户"
                :visible.sync="editUserDialogVisible"
                width="30%">
            <el-form ref="form" :model="editData" :rules="editUserRules" label-width="0px">
                <el-form-item label="" prop="username" style="text-align: center">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="" prop="username">
                    <el-input v-model="editData.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input v-model="editData.email" prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item label="" prop="phone">
                    <el-input v-model="editData.phone" prefix-icon="el-icon-phone-outline"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="editData.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Ref} from 'vue-property-decorator';
    import {getUsers, createUsers, destroyUsers, updateUsers} from '../api/index';
    import {ElForm} from 'element-ui/types/form';

    @Component({
        name: "Users",
        components:{},
    })
    export default class Users extends Vue{

        private tableData:any[] = [];
        private searchData = {
            role:'',
            origin:'',
            type:'',
            key:''
        };
        private resetDefaultActivePath(){
            sessionStorage.removeItem('acitvePath');
        };
        private onSubmit(){

        };
        private exportUsers(){

        };
        private importUsers(){

        };

        // 添加用户相关代码
        private userData = {
            username:'',
            email:'',
            phone:'',
            password:''
        };
        private addUserDialogVisible = false;
        private validateName = (rule: any, value:string, callback:any) => {
            const reg = /^[A-Za-z0-9]{6,}$/;
            if(!value){
                callback(new Error('请填写用户名'));
            }else if(value.length < 6){
                callback(new Error('用户名至少是6位'));
            }else if(!reg.test(value)){
                callback(new Error('用户名只能是字母和数字'));
            }else{
                callback();
            }
        };
        private validatePass = (rule: any, value:string, callback:any) => {
            const reg = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,}$/;
            if(!value){
                callback(new Error('请填写密码'));
            }else if(value.length < 6){
                callback(new Error('密码至少是8位'));
            }else if(!reg.test(value)){
                callback(new Error('密码必须包含字母数字和特殊符号'));
            }else{
                callback();
            }
        };
        private validatePass2 = (rule: any, value:string, callback:any) => {
            const reg = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,}$/;
            if(value){
                if(value.length < 6){
                    callback(new Error('密码至少是8位'));
                }else if(!reg.test(value)){
                    callback(new Error('密码必须包含字母数字和特殊符号'));
                }
            }else{
                callback();
            }
        };
        private validateEmail = (rule: any, value:string, callback:any) => {
            const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(value && !reg.test(value)){
                callback(new Error('邮箱格式不正确'));
            }else{
                callback();
            }
        };
        private validatePhone = (rule: any, value:string, callback:any) => {
            const reg = /^1[3456789]\d{9}$/;
            if(value && !reg.test(value)){
                callback(new Error('手机格式不正确'));
            }else{
                callback();
            }
        };
        private addUserRules = {
            username: [
                { validator: this.validateName, trigger: 'blur' }
            ],
            password: [
                { validator: this.validatePass, trigger: 'blur' }
            ],
            email: [
                { validator: this.validateEmail, trigger: 'blur' }
            ],
            phone: [
                { validator: this.validatePhone, trigger: 'blur' }
            ],
        };
        @Ref() readonly form?: ElForm;
        private showAddUserDialog(){
            this.addUserDialogVisible = true;
            this.form ? this.form.resetFields() : '';
        };
        private createUser(){
            this.addUserDialogVisible = false;
            this.form!.validate((flag)=>{
                if(flag){
                    createUsers(this.userData)
                        .then((response:any)=>{
                            if(response.status === 200){
                                const user = response.data.data;
                                this.tableData.push(user);
                                (this as any).$message.success('添加用户成功');
                            }else{
                                (this as any).$message.error(response.data.msg);
                            }
                        })
                        .catch((error)=>{
                            (this as any).$message.error(error.response.data.msg);
                        })
                }else{
                    (this as any).$message.error('数据格式不对');
                }
            });
        }

        // 删除用户相关代码
        private destroyUser(id:string){
            destroyUsers(id)
                .then((response:any)=>{
                    if(response.status === 200){
                        const idx = this.tableData.findIndex((obj)=>{
                            return obj.id === id;
                        });
                        this.tableData.splice(idx, 1);
                        (this as any).$message.success('删除用户成功');
                    }else{
                        (this as any).$message.error(response.data.msg);
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error(error.response.data.msg);
                })
        }

        // 编辑用户相关代码
        private editUserRules = {
            username: [
                { validator: this.validateName, trigger: 'blur' }
            ],
            password: [
                { validator: this.validatePass2, trigger: 'blur' }
            ],
            email: [
                { validator: this.validateEmail, trigger: 'blur' }
            ],
            phone: [
                { validator: this.validatePhone, trigger: 'blur' }
            ],
        };
        private editData = {
            id:'',
            username:'',
            email:'',
            phone:'',
            password:'',
            avatarURL: ''
        };
        private editUserDialogVisible = false;
        private showEditUserDialog(user:any){
            this.editUserDialogVisible = true;
            this.form ? this.form.resetFields() : '';
            this.editData = Object.assign(this.editData, user);
        }
        private editUser(){
            this.editUserDialogVisible = false;
            this.form!.validate((flag)=>{
                if(flag){
                    updateUsers(this.editData.id, this.editData)
                        .then((response:any)=>{
                            if(response.status === 200){
                                const idx = this.tableData.findIndex((obj)=>{
                                    return obj.id === this.editData.id;
                                });
                                // 直接给数组的某一个索引赋值, 是不会触发Vue更新界面的
                                // this.tableData[idx] = this.editData;
                                this.$set(this.tableData, idx, this.editData);
                                (this as any).$message.success('更新用户成功');
                            }else{
                                (this as any).$message.error(response.data.msg);
                            }
                        })
                        .catch((error)=>{
                            (this as any).$message.error(error.response.data.msg);
                        })
                }else{
                    (this as any).$message.error('数据格式不对');
                }
            });
        }

        // 上传用户头像相关代码
        // 上传成功之后的回调
        private handleAvatarSuccess(res:any, file:any) {
            this.editData.avatarURL = res;
        }
        // 上传之前的回调
        private beforeAvatarUpload(file:any) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                (this as any).$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                (this as any).$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
        created(): void {
            getUsers()
                .then((response:any)=>{
                    if(response.status === 200){
                        this.tableData = response.data.data;
                    }else{
                        (this as any).$message.error(response.data.msg);
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error(error.response.data.msg);
                })
        }
    }
</script>

<style lang="scss" scoped>
    .el-breadcrumb{
        padding-bottom: 20px;
    }
    .el-pagination{
        padding-top: 20px;
    }
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
