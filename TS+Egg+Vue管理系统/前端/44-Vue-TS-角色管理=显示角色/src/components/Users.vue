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
                <el-col :span="18">
                    <el-form :inline="true" :model="searchData" class="demo-form-inline">
                        <el-form-item label="">
                            <el-select v-model="searchData.role" placeholder="-所有角色-">
                                <el-option label="-所有角色-" value=""></el-option>
                                <el-option label="管理员" value="manger"></el-option>
                                <el-option label="普通用户" value="normal"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="searchData.origin" placeholder="-所有来源-">
                                <el-option label="-所有来源-" value=""></el-option>
                                <el-option label="本地注册" value="local"></el-option>
                                <el-option label="Github登录" value="github"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="searchData.type" placeholder="-所有用户-">
                                <el-option label="-所有用户-" value=""></el-option>
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
                            <el-button type="primary" @click="exportUser">导出搜索结果</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="showAddUserDialog">添加用户</el-button>
                    <el-upload
                            class="excel-uploader"
                            action="http://127.0.0.1:7001/api/v1/importUser/"
                            :show-file-list="false"
                            :on-success="handleExcelSuccess"
                            :before-upload="beforeExcelUpload"
                            accept=".xls">
                        <el-button type="primary">导入用户</el-button>
                    </el-upload>
                    <a href="http://127.0.0.1:7001/api/v1/exportUser/">
                        <el-button type="primary">导出所有用户</el-button>
                    </a>
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
                        :formatter="getCurrentRoleName"
                        label="角色">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <!-- {{scope.row.userState}}-->
                        <el-switch
                                v-model="scope.row.userState"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeUserState(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showEditUserDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="destroyUser(scope.row.id)"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" @click="showAddRoleDialog(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!--底部分页区域-->
        <el-pagination
                :current-page="searchData.currentPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="searchData.pageSize"
                :total="totalCount"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
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
                            action="http://127.0.0.1:7001/api/v1/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="editData.avatarURL" :src="editData.baseURL + editData.avatarURL" class="avatar">
<!--                        <img v-if="editData.avatarURL" :src="editData.avatarURL" class="avatar">-->
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

        <!--分配角色对话框-->
        <el-dialog
                title="分配角色"
                :visible.sync="addRoleDialogVisible"
                width="30%">
            <el-form ref="form" :model="currentUser" label-width="80px">
                <el-form-item label="当前用户">
                    <el-input v-model="currentUser.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="当前角色">
                    <el-input v-model="currentRoleName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新的角色">
                    <el-select v-model="currentRoleId" placeholder="请选择角色">
                        <el-option
                                v-for="item in roles"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole(currentUser.id)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Ref} from 'vue-property-decorator';
    import {getUsers, createUsers, destroyUsers, updateUsers, getRoles, createUserRole} from '../api/index';
    import {ElForm} from 'element-ui/types/form';
    import XLSX from 'xlsx';
    import { saveAs } from 'file-saver';

    @Component({
        name: "Users",
        components:{},
    })
    export default class Users extends Vue{
        // 搜索相关代码
        private tableData:any[] = [];
        private searchData = {
            role:'',
            origin:'',
            type:'',
            key:'',
            currentPage: 1,
            pageSize: 5
        };
        private totalCount = 0;
        private resetDefaultActivePath(){
            sessionStorage.removeItem('acitvePath');
        };
        private onSubmit(){
            this.getUserList();
        };

        // 导出相关代码
        private exportUser(){
            const user = this.tableData.length ? this.tableData[0] : null;
            const data:any[] = [];
            if(user){
                const cloumnTitles = Object.keys(user);
                data.push(cloumnTitles);
                this.tableData.forEach((user)=>{
                    const temp:any[] = [];
                    cloumnTitles.forEach((key)=>{
                        temp.push(user[key]);
                    });
                    data.push(temp);
                });
            }
            // 1.根据二维数组生成表格中的数据
            const sheet = XLSX.utils.aoa_to_sheet(data);
            // 2.创建一个新的表格
            const workbook = XLSX.utils.book_new();
            // 3.把数据添加到表格中, 并给这个表格起一个名称
            XLSX.utils.book_append_sheet(workbook, sheet, 'user');
            // 4.将生成好的表格保存到本地
            // XLSX.writeFile(workbook, 'users.xls'); // 有兼容问题
            const wopts:any = { bookType:'xlsx', bookSST:false, type:'array' };
            const wbout = XLSX.write(workbook,wopts);
            saveAs(new Blob([wbout],{type:"application/octet-stream"}), "users.xlsx");
        }

        // 分页相关代码
        private getUserList(){
            getUsers(this.searchData)
                .then((response:any)=>{
                    if(response.status === 200){
                        this.tableData = response.data.data.users;
                        this.totalCount = response.data.data.totalCount;
                    }else{
                        (this as any).$message.error(response.data.msg);
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error(error.response.data.msg);
                });
        }
        created(): void {
            this.getUserList();
        }
        private handleSizeChange(currentSize:any){
            // console.log(currentSize);
            this.searchData.pageSize = currentSize;
            this.getUserList();
        }
        private handleCurrentChange(currentPage:any){
            // console.log(currentPage);
            this.searchData.currentPage = currentPage;
            this.getUserList();
        }

        // 添加用户相关代码
        private userData = {
            username:'',
            email:'',
            phone:'',
            password:'',
            userState: true
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
                        this.getUserList();
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
        private handleAvatarSuccess(res:any, file:any) {
            if(res.code === 200){
                this.editData.avatarURL = res.data;
            }
        }
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

        // 修改用户状态相关代码
        private changeUserState(user:any){
            updateUsers(user.id, user)
                .then((response:any)=>{
                    if(response.status === 200){
                        (this as any).$message.success('更新用户状态成功');
                    }else{
                        user.userState = !user.userState;
                        (this as any).$message.error('更新用户状态失败');
                    }
                })
                .catch((error)=>{
                    user.userState = !user.userState;
                    (this as any).$message.error('更新用户状态失败');
                });
        }

        // 上传Excel相关代码
        private handleExcelSuccess(res:any, file:any) {
            console.log(res);
        }
        private beforeExcelUpload(file:any) {
            console.log(file.type);
            const isExcel = file.type === 'application/vnd.ms-excel';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isExcel) {
                (this as any).$message.error('只能上传Excel文件');
            }
            if (!isLt2M) {
                (this as any).$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isExcel && isLt2M;
        }

        // 分配角色相关代码
        private addRoleDialogVisible = false;
        private currentUser = {};
        private roles = [];
        private currentRoleId = "";
        private showAddRoleDialog(user:any){
            this.addRoleDialogVisible = true;
            this.currentUser = user;
            getRoles({})
                .then((response:any)=>{
                    if(response.status === 200){
                        this.roles = response.data.data.roles;
                        (this as any).$message.success('获取角色信息成功');
                    }else{
                        (this as any).$message.error('获取角色信息失败');
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error('获取角色信息失败');
                });
        }
        private addRole(userId:string){
            // console.log(userId, this.currentRoleId);
            this.addRoleDialogVisible = false;
            const obj = {userId: userId, roleId: this.currentRoleId};
            createUserRole(obj)
                .then((response:any)=>{
                    if(response.status === 200){
                        (this as any).$message.success('分配角色成功');
                    }else{
                        (this as any).$message.error('分配角色失败');
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error('分配角色失败');
                });
        }
        // private getCurrentRoleName(user:any){
        private getCurrentRoleName(user: any){
            const roles = user.roles;
            const names:any[] = [];
            roles.forEach((role:any)=>{
                names.push(role.roleName);
            })
            return names.join(' | ');
        }
        private get currentRoleName(){
            if(JSON.stringify(this.currentUser) === '{}') return "";
            return this.getCurrentRoleName(this.currentUser);
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
    .excel-uploader{
        display: inline-block;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>
