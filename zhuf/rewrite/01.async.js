let fs = require('fs');

function* foo() {
  var index = 0;
  while (index < 2) {
    yield index++; //暂停函数执行，并执行yield后的操作
  }
}
var bar = foo(); // 返回的其实是一个迭代器

console.log(bar.next());    // { value: 0, done: false }
console.log(bar.next());    // { value: 1, done: false }
console.log(bar.next());    // { value: undefined, done: true }

function co(gen) {
  let it = gen();
  return new Promise(function (resolve, reject) {
    !function next(lastVal) {
      let { value, done } = it.next(lastVal);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reason => reject(reason));
      }
    }();
  });
}


function readFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, function (err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    })
  })
}
function* read() {
  let template = yield readFile('./template.txt');
  let data = yield readFile('./data.txt');
  return template + '+' + data;
}
co(read).then(function (data) {
  console.log(data);
}, function (err) {
  console.log(err);
});


async function read2() {
  let template = await readFile('./template.txt');
  let data = await readFile('./data.txt');
  return template + '+' + data;
}
let result = read2();
result.then(data => console.log(data));


// 等同于
function read() {
  return co(function* () {
    let template = yield readFile('./template.txt');
    let data = yield readFile('./data.txt');
    return template + '+' + data;
  });
}

