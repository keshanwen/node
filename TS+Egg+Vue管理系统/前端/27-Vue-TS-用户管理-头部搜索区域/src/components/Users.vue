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
