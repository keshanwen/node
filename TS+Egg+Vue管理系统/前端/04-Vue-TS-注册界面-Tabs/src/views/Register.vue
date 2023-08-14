<template>
    <div class="register_container">
        <div class="register_box">
            <h1>欢迎注册</h1>
            <el-tabs tab-position="left" style="height: 200px;">
                <el-tab-pane label="普通注册">普通注册</el-tab-pane>
                <el-tab-pane label="邮箱注册">邮箱注册</el-tab-pane>
                <el-tab-pane label="手机注册">手机注册</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({
        name: "Register",
        components:{},
    })
    export default class Register extends Vue{

    }
</script>

<style lang="scss" scoped>
.register_container {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat;
    background-size: cover;
    .register_box{
        width: 500px;
        height: 300px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h1{
            text-align: center;
        }
    }
}
</style>
