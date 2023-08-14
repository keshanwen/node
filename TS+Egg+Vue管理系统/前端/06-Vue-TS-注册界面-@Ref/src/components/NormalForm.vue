<template>
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
                    <img src="http://127.0.0.1:7001/imagecode" ref="captchaImage" @click="updateCaptcha">
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
</template>

<script lang="ts">
    import {Component, Vue, Ref} from 'vue-property-decorator';
    @Component({
        name: "NormalForm",
        components:{},
    })
    export default class NormalForm extends Vue{
        registerData = {
            username: '',
            password: '',
            captcha: '',
            registerType: 'normal',
            checked: false
        };
        @Ref() readonly  captchaImage!: HTMLImageElement;
        updateCaptcha(){
            // 虽然可以通过 as any解决报错的问题, 但是并不符合TS的思想
            // (this.$refs.captchaImage as any).src = `http://127.0.0.1:7001/imagecode?r=${Math.random()}`;
            this.captchaImage.src = `http://127.0.0.1:7001/imagecode?r=${Math.random()}`;
        };
        onSubmit(){

        };
    }
</script>

<style lang="scss" scoped>

</style>
