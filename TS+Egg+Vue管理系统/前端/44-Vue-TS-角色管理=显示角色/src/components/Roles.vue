<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--内容卡片区域-->
        <el-card class="box-card">
            <!--头部搜索区域-->
            <el-form :model="searchData" class="demo-form-inline">
                <el-form-item label="" style="width: 100%">
                    <el-input v-model="searchData.key" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item class="query_role">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddRoleDialog">添加</el-button>
                </el-form-item>
            </el-form>
            <!--中间表格区域-->
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :border="true"
                    :stripe="true">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        label="角色名称">
                </el-table-column>
                <el-table-column
                        prop="roleDesc"
                        label="角色备注">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.roleState"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeRoleState(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showEditRoleDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="destroyRole(scope.row.id)"></el-button>
                        <el-button type="warning" icon="el-icon-setting"></el-button>
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

        <!--添加角色对话框-->
        <el-dialog
                title="添加角色"
                :visible.sync="addRoleDialogVisible"
                width="30%">
            <el-form ref="form" :model="roleData" :rules="addRoleRules" label-width="0px">
                <el-form-item label="" prop="roleName">
                    <el-input v-model="roleData.roleName" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="" prop="roleDesc">
                    <el-input v-model="roleData.roleDesc" prefix-icon="el-icon-info"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createRole">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑角色对话框-->
        <el-dialog
                title="编辑用户"
                :visible.sync="editRoleDialogVisible"
                width="30%">
            <el-form ref="form" :model="editData" :rules="addRoleRules" label-width="0px">
                <el-form-item label="" prop="roleName">
                    <el-input v-model="editData.roleName" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="" prop="roleDesc">
                    <el-input v-model="editData.roleDesc" prefix-icon="el-icon-info"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Ref} from 'vue-property-decorator';
    import {ElForm} from 'element-ui/types/form';
    import {getRoles, createRoles, updateRoles, destroyRoles} from '../api/index';

    @Component({
        name: "Roles",
        components:{},
    })
    export default class Roles extends Vue{
        private resetDefaultActivePath(){
            sessionStorage.removeItem('acitvePath');
        };

        // 搜索相关代码
        private tableData:any[] = [];
        private searchData = {
            key:'',
            currentPage: 1,
            pageSize: 5
        };
        private onSubmit(){
            this.getRoleList();
        };

        // 添加角色相关代码
        private addRoleRules = {
            roleName: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 1,  message: '长度至少1个字符', trigger: 'blur' }
            ],
            roleDesc: [
                { required: true, message: '请输入角色描述', trigger: 'blur' },
                { min: 1,  message: '长度至少1个字符', trigger: 'blur' }
            ],
        };
        private addRoleDialogVisible = false;
        private roleData = {
            roleName: '',
            roleDesc: '',
            roleState: true
        };
        @Ref() readonly form?: ElForm;
        private showAddRoleDialog(){
            this.addRoleDialogVisible = true;
            this.form ? this.form.resetFields() : '';
        }
        private createRole(){
            this.addRoleDialogVisible = false;
            this.form!.validate((flag)=>{
                if(flag){
                    createRoles(this.roleData)
                        .then((response:any)=>{
                            if(response.status === 200){
                                const user = response.data.data;
                                this.tableData.push(user);
                                (this as any).$message.success('添加角色成功');
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
        };

        // 编辑角色相关代码
        private editRoleDialogVisible = false;
        private editData = {
            id:'',
            roleName: '',
            roleDesc: '',
            roleState: ''
        }
        private showEditRoleDialog(role:any){
            this.editRoleDialogVisible = true;
            this.form ? this.form.resetFields() : '';
            this.editData = Object.assign(this.editData, role);
        }
        private editRole(){
            this.editRoleDialogVisible = false;
            this.form!.validate((flag)=>{
                if(flag){
                    updateRoles(this.editData.id, this.editData)
                        .then((response:any)=>{
                            if(response.status === 200){
                                const idx = this.tableData.findIndex((obj)=>{
                                    return obj.id === this.editData.id;
                                });
                                this.$set(this.tableData, idx, this.editData);
                                (this as any).$message.success('更新角色成功');
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

        // 修改角色状态相关代码
        private changeRoleState(user:any){
            updateRoles(user.id, user)
                .then((response:any)=>{
                    if(response.status === 200){
                        const idx = this.tableData.findIndex((obj)=>{
                            return obj.id === this.editData.id;
                        });
                        this.$set(this.tableData, idx, this.editData);
                        (this as any).$message.success('更新角色成功');
                    }else{
                        (this as any).$message.error(response.data.msg);
                    }
                })
        }

        // 删除角色相关代码
        private destroyRole(id:string){
            destroyRoles(id)
                .then((response:any)=>{
                    if(response.status === 200){
                        const idx = this.tableData.findIndex((obj)=>{
                            return obj.id === id;
                        });
                        this.tableData.splice(idx, 1);
                        this.getRoleList();
                        (this as any).$message.success('删除角色成功');
                    }else{
                        (this as any).$message.error(response.data.msg);
                    }
                })
                .catch((error)=>{
                    (this as any).$message.error(error.response.data.msg);
                })
        }

        // 分页相关代码
        private totalCount = 0;
        private getRoleList(){
            getRoles(this.searchData)
                .then((response:any)=>{
                    if(response.status === 200){
                        this.tableData = response.data.data.roles;
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
            this.getRoleList();
        }
        private handleSizeChange(currentSize:any){
            this.searchData.pageSize = currentSize;
            this.getRoleList();
        }
        private handleCurrentChange(currentPage:any){
            this.searchData.currentPage = currentPage;
            this.getRoleList();
        }
    }
</script>

<style lang="scss" scoped>
    .el-breadcrumb{
        padding-bottom: 20px;
    }
    .demo-form-inline{
        display: flex;
        justify-content: center;
    }
    .query_role{
        padding: 0 20px;
    }
    .el-pagination{
        padding-top: 20px;
    }
</style>
