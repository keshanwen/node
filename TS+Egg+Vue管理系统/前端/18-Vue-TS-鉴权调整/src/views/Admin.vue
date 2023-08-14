<template>
    <div>
        <el-button @click="myFn">我是按钮</el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getUsers} from '../api/index';

    @Component({
        name: "Admin",
        components:{},
    })
    export default class Admin extends Vue{
        myFn(){
            getUsers()
                .then((data)=>{
                    console.log(data);
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
    }
</script>

<style lang="scss" scoped>

</style>
