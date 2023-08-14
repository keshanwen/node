<template>
  <div class="home">
    <p>首页</p>
    <p>{{message}}</p>
    <button @click="myFn">我是父组件按钮</button>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <Son :parentdata="message" @parentfn="myFn"></Son>
  </div>
</template>

<script>

import Son from '../components/Son'
export default {
  name: 'Home',
  // 数据绑定
  data: function(){
    return {
      message: 'www.it666.com',
      str: '12345678'
    }
  },
  // 方法绑定
  methods:{
    myFn:function () {
      alert('www.itzb.com')
    }
  },
  // 计算属性
  computed: {
    msg(){
      console.log('执行了');
      return this.str.split("").reverse().join("");
    }
  },
  // 属性观察
  watch:{
    message(newValue, oldValue){
      console.log(newValue, oldValue);
    }
  },
  // 传递数据给子组件
  // 传递方法给子组件
  components: {
    Son
  }
}
</script>
