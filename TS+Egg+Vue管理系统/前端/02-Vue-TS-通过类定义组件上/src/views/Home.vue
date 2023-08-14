<template>
  <div class="home">
    <p>首页</p>
    <p>{{message}}</p>
    <button @click="myFn">我是父组件的按钮</button>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
  </div>
</template>

<script>
/*
1.如果在Vue项目中使用了TypeScript,
那么除了可以像过去一样通过对象的方式来定义组件以外
还可以借助官方的vue-class-component库和vue-property-decorator库用类的方式来定义组件
vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
https://class-component.vuejs.org/
vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
https://github.com/kaorun343/vue-property-decorator
* */

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
  // 数据绑定
  // 如果是通过类的方式来定义组件, 那么类中的属性就是过去data中定义的数据
  message = 'www.it666.com';
  str = '12345678';
  // 方法绑定
  // 如果是通过类的方式来定义组件, 那么类中的方法就是过去methods中定义的方法
  myFn(){
    alert('www.itzb.com');
  }
  // 计算属性
  // 如果是通过类的方式来定义组件, 那么我们类中的getter方法就是过去computed中的方法
  get msg(){
    console.log('执行了');
    return this.str.split("").reverse().join("");
  }
}
</script>
