function EventEmitter() {
    this._events = Object.create(null)
}
// 订阅 将用户的callback缓存起来
EventEmitter.prototype.on = function(eventName, callback) {
    // {'女生失恋':[fn,fn,fn]}
    if (!this._events) this._events = Object.create(null); // girl._events = {}
    let eventCallbacks = this._events[eventName]|| (this._events[eventName] = []);

    // 没放到数组之前 我需要触发newListener对应的事件

    if(eventName !== 'newListener') this.emit('newListener',eventName);

    eventCallbacks.push(callback);
}
EventEmitter.prototype.emit = function(eventName, ...args) {
    // [fn,fn,fn].forEach
    if (!this._events) this._events = Object.create(null)
    let eventCallbacks = this._events[eventName]
    eventCallbacks && eventCallbacks.forEach(cb => cb(...args));
}
// once也是绑定事件，只不过稍后触发的时候需要将自己触发后移除掉
EventEmitter.prototype.once = function(eventName, callback) {
    const once = (...args) => { // 为了方便扩展
        callback(...args);
        this.off(eventName, once);
    }
    once.l = callback
    // callback.l = once; // 记录g2上对应的once是谁
    this.on(eventName, once); // promise绑定事件的时候
}
EventEmitter.prototype.off = function(eventName, callback) {
    if (!this._events) this._events = Object.create(null)
    let eventCallbacks = this._events[eventName]
    if (eventCallbacks) {
        this._events[eventName] = this._events[eventName].filter(item => (item !== callback) && (item.l !== callback))
    }
}
module.exports = EventEmitter