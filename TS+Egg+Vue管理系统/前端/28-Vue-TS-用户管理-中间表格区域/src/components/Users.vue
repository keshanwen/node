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
                    <el-button type="primary" @click="addUser">添加用户</el-button>
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
                        <el-button type="primary" icon="el-icon-edit"></el-button>
                        <el-button type="danger" icon="el-icon-delete"></el-button>
                        <el-button type="warning" icon="el-icon-setting"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({
        name: "Users",
        components:{},
    })
    export default class Users extends Vue{
        private tableData = [
            {
                username:'jonathan',
                email:'97606813@qq.com',
                phone:'17301727164',
                roleName:'超级管理员',
                avatarURL: '',
                userState: true
            },
            {
                username:'it666',
                email:'97606814@qq.com',
                phone:'13554499311',
                roleName:'普通用户',
                avatarURL: '',
                userState: false
            }
        ]
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
        private addUser(){

        };
        private importUsers(){

        };
    }
</script>

<style lang="scss" scoped>
.el-breadcrumb{
    padding-bottom: 20px;
}
</style>
