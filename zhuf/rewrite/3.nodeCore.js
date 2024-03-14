/*
  global 类此与 window 变量

  注意：
    module.exports  exports __filename __dirname require 不是全局变量，要区分开。每一个 js 文件，都是一个模块，在引入的时候会将一个文件包装成一个函数，这几个属性是在包装成函数过程中传递的参数。


    在node.js里，process 对象代表node.js应用程序，可以获取应用程序的用户，运行环境等各种信息

    process.nextTick()方法将 callback 添加到"next tick 队列"。 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用。

    setImmediate预定立即执行的 callback，它是在 I/O 事件的回调之后被触发

    setImmediate(function () {
      console.log('4');
    });

    setTimeout(() => {
      console.log('setTimeout')
    })

    setImmediate(function () {
      console.log('5');
    });


    process.nextTick(function () {
      console.log('1');
      process.nextTick(function () {
        console.log('2');
        process.nextTick(function () {
          console.log('3');
        });
      });
    });

    console.log('next');
*/






