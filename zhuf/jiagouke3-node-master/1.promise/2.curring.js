// 回去自己实现以下 防抖 、节流 、 反柯里化（让函数的作用范围变大）

// 柯里化的含义就是让一个函数变的更具体一些  （原则上返回的函数只能接受一个参数） 多个参数我们也姑且认为是柯里化
// 高阶函数中 包含柯里化函数的 （柯里化函数就是一个高阶函数） 
// 偏函数:返回一个函数，函数的参数不止一个。


// 1.判断一个数据的类型

// 判断类型有几种方式 typeof Object.prototype.toString instanceof constructor 
function isType(type, value) { // [object String]
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
// let flag = isType('Number','abc');
// flag = isType('Number','abc');
// flag = isType('Number1',123);

// function isType(type) {
//     return function(value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`
//     }
// }
// let isString = isType('String');
// let isNumber = isType('Number');
// console.log(isString('abc'))
// console.log(isNumber(123))
// console.log(flag)

// 高阶函数可以暂存变量 （内部有闭包）

// 通用的柯里化函数 就是根据调用的时候传递的参数，和函数的参数 做判断，如果传递的参数和定义的参数一致，就让函数执行
const curry = fn => {
    // 需要有一个记录参数的变量args
    const inner = (args = []) => {
        // 每次都用一个新的数组 + 自己的参数
        return fn.length <= args.length ? fn(...args) : (...a)=>inner([...args,...a])
    }
    return inner();
}
// const type = curry(isType)
// let isString = type('String');
// let isNumber = type('Number');
// console.log(isString('abc'));
// console.log(isNumber('abc'));





// function sum(a, b, c, d, e) { // 这里fn.length 就是sum的个数
//     return a + b + c + d + e
// }
// let newSum = curry(sum);
// let fn1 = newSum(1, 2);
// let fn2 = fn1(3, 4);
// let r = fn2(5);
// console.log(r);