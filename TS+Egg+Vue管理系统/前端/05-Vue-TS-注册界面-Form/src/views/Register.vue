<template>
    <div class="register_container">
        <div class="register_box">
            <h1>欢迎注册</h1>
            <el-tabs tab-position="left" style="height: 300px;">
                <el-tab-pane label="普通注册">
                    <el-form ref="form" :model="registerData" label-width="0px">
                        <el-form-item label="">
                            <el-input v-model="registerData.username" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="registerData.password" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-row>
                                <el-col :span="18">
                                    <el-input v-model="registerData.captcha" prefix-icon="el-icon-lock"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <img src="../assets/code.png" style="width: 120px; height: 40px">
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" style="width: 100%">注册</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="registerData.checked">
                                <p>
                                    阅读并接受
                                    <a href="javascript:;">《知播渔用户协议》</a>
                                    及
                                    <a href="javascript:;">《知播渔隐私权保护声明》</a>
                                </p>
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
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
        registerData = {
            username: '',
            password: '',
            captcha: '',
            registerType: 'normal',
            checked: false
        }
        onSubmit(){

        }
    }
</script>

<style lang="scss" scoped>
.register_container {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat;
    background-size: cover;
    .register_box{
        width: 600px;
        height: 400px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h1{
            text-align: center;
        }
        a{
            text-decoration: none;
        }
        .el-form{
            padding-right: 20px;
            box-sizing: border-box;
        }
    }
}
</style>
