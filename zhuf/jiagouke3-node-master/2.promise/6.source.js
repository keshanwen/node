"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        // var info = it.next(undefine)
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) { reject(error); return; }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) { // iterator
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function readContent(_x) {
    return _readContent.apply(this, arguments);
}

function _readContent() {
    _readContent = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee(filePath) {
        var r1, r2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fs.readFile(filePath, 'utf8');

                    case 2:
                        r1 = _context.sent;
                        _context.next = 5;
                        return fs.readFile(r1, 'utf8');

                    case 5:
                        r2 = _context.sent;
                        return _context.abrupt("return", r2);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _readContent.apply(this, arguments);
}