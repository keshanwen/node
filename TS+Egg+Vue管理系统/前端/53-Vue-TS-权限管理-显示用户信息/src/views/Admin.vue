<template>
    <el-container>
        <el-header>
            <div class="header-left" @click="toggleCollapse"></div>
            <div class="header-right">
                <img :src="userInfo.baseURL + userInfo.avatarURL" alt="">
                <p>{{userInfo.username || userInfo.email || userInfo.phone}}</p>
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
                        :router="true"
                        :default-active="defaultActivePath">
                    <!--一级菜单-->
                    <el-submenu :index="item.menuName"
                                v-for="item in menus"
                                :key="item.menuName">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.menuName}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item-group>
                            <el-menu-item :index="subItem.path"
                                          v-for="subItem in item.children"
                                          :key="subItem.menuName"
                                          @click="changeDefaultActivePath(subItem.path)">
                                <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span>{{subItem.menuName}}</span>
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
        private defaultActivePath = '';
        private menus = [
            {
                menuName:'用户管理',
                path: '',
                icon: 'el-icon-setting',
                children:[
                    {menuName:'用户列表',path: '/users', icon:'el-icon-user', children:[]}
                ]
            },
            {
                menuName:'权限管理',
                path: '',
                icon:'el-icon-collection',
                children:[
                    {menuName:'角色列表',path: '/roles', icon:'el-icon-view',children:[]},
                    {menuName:'权限列表',path: '/rights', icon:'el-icon-unlock',children:[]}
                ]
            }
        ]
        private isCollapse = false;
        private toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
        private logout(){
            Cookies.remove('token');
            sessionStorage.removeItem('acitvePath');
            sessionStorage.removeItem('userInfo');
            this.$router.push('/login');
        }
        private changeDefaultActivePath(path:string){
            this.defaultActivePath = path;
            sessionStorage.setItem('acitvePath', path);
        }
        private userInfo = {};
        created(): void {
            const path = sessionStorage.getItem('acitvePath');
            this.defaultActivePath = path ? path : '';
            const userInfo = sessionStorage.getItem('userInfo');
            if(userInfo){
                this.userInfo = JSON.parse(userInfo);
            }
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
