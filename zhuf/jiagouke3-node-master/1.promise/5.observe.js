class Subject { // 被观察者 
    constructor(name){
        this._arr = [];
        this.name =name
        this.state = '我很开心'
    }
    attach(o){ // 被观察者要接收观察者
        this._arr.push(o)
    }
    setState(newState){
        this.state = newState;
        this._arr.forEach(o=>o.update(this))
    }
}
class Observer{ // 观察者
    constructor(name){
        this.name = name
    }
    update(s){
        console.log(this.name + ":" + s.name + '当前的状态是' + s.state )
    }
}
// 父母监控小宝宝的状态，小宝宝不开心了 会主动通知父母
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');
let s = new Subject('小宝宝')
s.attach(o1); // vue就是这种观察者模式 数据变化 让她依赖的视图刷新
s.attach(o2);
s.setState('我不开心了');
s.setState('我开心了')