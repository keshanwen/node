const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
    constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = []; // 用来存储then中的回调
        const resolve = (value) => {
            if(this.status == PENDING){
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        const reject = (reason) => {
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) { // 如果执行时发生了异常就将异常作为失败的原因
            reject(e)
        }
    }
    then(onFulfilled, onRejected) { // Promise.prototype.then
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if( this.status === PENDING){
            // 这时候用户没有调用 成功或者失败 没有resolve和reject
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            })
        }
    }
}
module.exports = Promise;
// node 默认不支持es6语法需要通过babel转义
// node的默认支持就是commonjs语法

