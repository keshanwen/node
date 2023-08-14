<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/admin" @click="resetDefaultActivePath">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            卡片区域
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
        private resetDefaultActivePath(){
            sessionStorage.removeItem('acitvePath');
        }
    }
</script>

<style lang="scss" scoped>
.el-breadcrumb{
    padding-bottom: 20px;
}
</style>
