<template>
    <el-container>
        <el-header>
            <div class="header-left"></div>
            <div class="header-right">
                <img src="../assets/lnj.jpg" alt="">
                <p>极客江南</p>
                <el-button>退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getUsers} from '../api/index';

    @Component({
        name: "Admin",
        components:{},
    })
    export default class Admin extends Vue{
        
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
