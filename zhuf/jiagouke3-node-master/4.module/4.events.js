// node是基于事件驱动的方式 （内置了发布订阅）


// 内置模块 fs, path, .... 直接使用不用安装 引用的时候不用加路径
// 文件模块 引用的时候需要通过相对路径或者绝对路径来使用
// 第三方模块 必须在使用前先安装，用法和内置模块一样
const EventEmitter = require('./events'); // 返回的是一个类 
const util = require('util')
// on 绑定事件  off解绑事件  emit发射事件  once绑定一次事件
function Girl() {} // 让子类继承父类原型上的方法？
// Girl.prototype.__proto__ = EventEmitter.prototype;
// Girl.prototype = Object.create(EventEmitter.prototype);
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype)

util.inherits(Girl, EventEmitter); // 原型继承 ， node中内部代码实现原型统一都是inherits方法
let girl = new Girl();
let pending = false;
girl.on('newListener', (eventName) => { // 只要绑定了事件就会触发次回调方法
    // 此时g1没有放到数组里 ，触发了一次事件  []
    // 此时g1 在数组中，触发了一次事件  [g1]
    // 此时g1 g2 在数组中，触发了一次事件  [g1,g1]
    if (!pending) {
        process.nextTick(() => {
            girl.emit(eventName); // 批处理 就是靠异步实现的，增加一个标识
            pending = false;
        })
        pending = true;
    }
})
const g1 = (...args) => console.log('cry', args)
const g2 = (...args) => console.log('eat', args)
const g3 = (...args) => console.log('shopping', args)
girl.on('女生失恋了', g1)
girl.on('女生失恋了', g2);
girl.on('女生失恋了', g3) // {'女生失恋了';[g1,g2,g3]}

// newListener 可以监控新绑定的事件
// on 可以订阅事件 addListener
// 事件方便 emit
// once 只绑定一个事件



// 我们希望能主动的监控用户绑定了什么事件