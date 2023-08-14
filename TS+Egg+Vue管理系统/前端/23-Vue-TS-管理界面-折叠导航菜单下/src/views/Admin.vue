<template>
    <el-container>
        <el-header>
            <div class="header-left" @click="toggleCollapse"></div>
            <div class="header-right">
                <img src="../assets/lnj.jpg" alt="">
                <p>极客江南</p>
                <el-button @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '65px' : '200px'">
                <!--垂直侧边栏-->
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#fff"
                        text-color="#666"
                        active-text-color="deepskyblue"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :router="true">
                    <!--一级菜单-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>用户管理</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item-group>
                            <el-menu-item index="/users">
                                <template slot="title">
                                    <i class="el-icon-user"></i>
                                    <span>用户列表</span>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--一级菜单-->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-collection"></i>
                            <span>权限管理</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item-group>
                            <el-menu-item index="/roles">
                                <template slot="title">
                                    <i class="el-icon-view"></i>
                                    <span>角色列表</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/rights">
                                <template slot="title">
                                    <i class="el-icon-unlock"></i>
                                    <span>权限列表</span>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Cookies from 'js-cookie'

    @Component({
        name: "Admin",
        components:{},
    })
    export default class Admin extends Vue{
        private isCollapse = false;
        private toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
        private logout(){
            Cookies.remove('token');
            this.$router.push('/login');
        }
    }
</script>

<style lang="scss" scoped>
.el-container{
    background: #ccc;
    width: 100%;
    height: 100%;
    .el-header{
        background: deepskyblue;
        display: flex;
        justify-content: space-between;
        .header-left{
            width: 200px;
            height: 60px;
            background: url("../assets/logo.png") center center no-repeat;
            background-size: 80% auto;
        }
        .header-right{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
            }
            p{
                padding-left: 10px;
                padding-right: 20px;
            }
        }
    }
    .el-aside{
        background: #fff;
    }
}
</style>
