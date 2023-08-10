const a = 100;
global.MY = 100;

// 用户不能通过修改exports的结果来导出， 因为这样不会影响module.exports


// exports 可以在添加属性的时候来取代module.exports ，为了简单一些
// exports.a = a; // 可以通过给exports增加属性的方式添加属性，会影响module.exports的结果
exports.a = 'hello';


// node中的commonjs规范不能 既用 exports 又使用module.exports , 因为最终导出的是module.exports 所以和es6Module不太一样 


// a.js的代码是在useA下执行的