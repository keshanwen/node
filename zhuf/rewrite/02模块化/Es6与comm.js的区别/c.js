import { counter, incCounter } from './d.js';
console.log(counter); // 3
incCounter();
console.log(counter); // 4


/*
  ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块

*/