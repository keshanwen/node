<template>
  <div class="home">
    <p>首页</p>
    <p>{{message}}</p>
    <button @click="myFn">我是父组件的按钮</button>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <Son :parentdata="message" @parentfn="myFn"></Son>
  </div>
</template>

<script>

import {Vue, Component, Watch} from 'vue-property-decorator';
import Son from '../components/Son'

@Component({
  // 如果在类中找不到需要添加的内容, 那么就可以写在这个地方
  name: 'Home',
  components: {
    Son
  }
})
export default class Home extends Vue {
  // 数据绑定
  // 如果是通过类的方式来定义组件, 那么类中的属性就是过去data中定义的数据
  message = 'www.it666.com';
  str = '12345678';
  // 方法绑定
  // 如果是通过类的方式来定义组件, 那么类中的方法就是过去methods中定义的方法
  myFn(data){
    alert(`www.itzb.com +++ ${data}`);
  }
  // 计算属性
  // 如果是通过类的方式来定义组件, 那么我们类中的getter方法就是过去computed中的方法
  get msg(){
    console.log('执行了');
    return this.str.split("").reverse().join("");
  }
  // 第一个参数: 需要观察的属性名称
  // 第二个参数: 可选配置, 如果deep:true,表示深度监听
  @Watch('message', {deep: true})
  messageChange(newValue, oldValue){
    console.log(newValue, oldValue);
  }
}
</script>
