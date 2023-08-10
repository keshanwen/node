let regeneratorRuntime = {
    mark(genFn) {
        return genFn
    },
    wrap(interatorFn) {
        const _context = {
            next: 0, // 指针 
            done: false,// 是否执行完成
            stop() { // 执行完毕后 会调此方法
                this.done = true 
            },
            sent: null // 每次的返回值
        }

        return {
            next(value) {  // 调用next的时候 会进行传递值
                _context.sent = value;
                let v = interatorFn(_context)
                return {
                    value:v,
                    done:_context.done
                }
            }
        }
    }
}
var _marked = /*#__PURE__*/ regeneratorRuntime.mark(say);
function say() {
    var a, b;
    return regeneratorRuntime.wrap(function say$(_context) { // 迭代器
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 'h';

                case 2:
                    a = _context.sent;
                    console.log(a, 'a');
                    _context.next = 6;
                    return 'ell';

                case 6:
                    b = _context.sent;
                    console.log(b); //return b // 函数执行完毕后 done :true
                   
                case 8:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked);
}
let it = say();
console.log(it.next())// {value:h,done:false}
console.log(it.next('xxx')); // xxx {value:ell,done:false}
console.log(it.next('123')) // 123 {value:undefined,done:true}
console.log(it.next()) //  {value:undefined,done:true}

// 不能回去执行