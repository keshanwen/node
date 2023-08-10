const fs = require('fs');
// 类似于柯里化的操作   发布订阅
let events = {
    _arr:[],
    on(fn) {
        this._arr.push(fn)
    },
    emit(...args) {
        this._arr.forEach(fn=>fn(...args))
    }
}
const obj = {}
events.on(function(key,value) {
    obj[key] = value;
})
events.on(function() {
    if(Object.keys(obj).length === 2){
        console.log(obj)
    }
})
fs.readFile('./a.txt', 'utf8', function(err, data) { // {a:'aaa',b:'bbb'}
    events.emit('a', data)
})

fs.readFile('./b.txt', 'utf8', function(err, data) {
    events.emit('b', data)
})

// 观察者模式 （前后有关联性，内部基于发布订阅了）  发布订阅 （发布和订阅之间没有关联，没订阅也能发布）