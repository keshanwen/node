const fs = require('fs')
const path = require('path')


/*
  fs.readFile(path[, options], callback)
  fs.readFileSync(path[, options])

  fs.writeFile(file, data[, options], callback)

  options
    encoding
    flag flag 默认 = 'w'
    mode 读写权限，默认为0666

  fs.writeFileSync(file, data[, options])

  fs.appendFile(file, data[, options], callback)

  从指定位置开始打开文件

  打开文件

  fs.open(filename,flags,[mode],callback);

    FileDescriptor 是文件描述符
    FileDescriptor 可以被用来表示文件
    in -- 标准输入(键盘)的描述符
    out -- 标准输出(屏幕)的描述符
    err -- 标准错误输出(屏幕)的描述符

    fs.open('./1,txt','r',0600,function(err,fd){});

  读取文件
  fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))

fs.open(path.join(__dirname,'1.txt'),'r',0o666,function (err,fd) {
    console.log(err);
    let buf = Buffer.alloc(6);
     fs.read(fd,buf,0,6,3,function(err, bytesRead, buffer){
       console.log(bytesRead);//6
       console.log(buffer===buf);//true
       console.log(buf.toString());//峰培
     })
})

// 写入文件
fs.write(fd, buffer[, offset[, length[, position]]], callback)

fs.open(path.join(__dirname,'1.txt'),'w',0o666,function (err,fd) {
    console.log(err);
    let buf=Buffer.from('珠峰培训');
     fs.write(fd,buf,3,6,0,function(err, bytesWritten, buffer){
       console.log(bytesWritten);//6
       console.log(buffer===buf);//true
       console.log(buf.toString());//珠峰培训
     })
})

同步磁盘文件
fs.fsync(fd,[callback]);

关闭文件
fs.close(fd,[callback]);

let buf = Buffer.from('珠峰培训');
fs.open('./2.txt', 'w', function (err, fd) {
  fs.write(fd, buf, 3, 6, 0, function (err, written, buffer) {
    console.log(written);
    fs.fsync(fd, function (err) {
      fs.close(fd, function (err) {
          console.log('写入完毕!')
        }
      );
    });
  })
});

拷贝文件

let BUFFER_SIZE=1;

function copy(src,dest,callback) {
    let buf=Buffer.alloc(BUFFER_SIZE);
    fs.open(src,'r',(err,readFd)=>{
        fs.open(dest,'w',(err,writeFd) => {
            !function read() {
                fs.read(readFd,buf,0,BUFFER_SIZE,null,(err,bytesRead) => {
                    bytesRead&&fs.write(writeFd,buf,0,bytesRead,read);
                });
            }()
        })
    });
}
copy(path.join(__dirname,'1.txt'),path.join(__dirname,'2.txt'),()=>console.log('ok'));

目录操作

创建目录

fs.mkdir(path[, mode], callback)

要求父目录必须存在

判断一个文件是否有权限访问
fs.access(path[, mode], callback)

fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});

读取目录下的所有文件
fs.readdir(path[, options], callback)

查看文件目录信息
fs.stat(path, callback)

stats.isFile()
stats.isDirectory()
atime(Access Time)上次被读取的时间。
ctime(State Change Time)：属性或内容上次被修改的时间。
mtime(Modified time)：档案的内容上次被修改的时间。

监视文件或目录
fs.watchFile(filename[, options], listener)

fs.watchFile('1.txt', (curr, prev) => {
  //parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
  if(Date.parse(prev.ctime)==0){
    console.log('创建');
  }else if(Date.parse(curr.ctime)==0){
    console.log('删除');
  }else if(Date.parse(prev.ctime) != Date.parse(curr.ctime)){
    console.log('修改');
  }
});

//  同步创建目录
function makepSync(dir) {
    let parts=dir.split(path.sep);
    for (let i=1;i<=parts.length;i++){
        let parent=parts.slice(0,i).join(path.sep);
        try {
            fs.accessSync(parent);
        } catch (error) {
            fs.mkdirSync(parent);
        }

    }
}

// 异步创建目录
function makepAsync(dir,callback) {
    let parts=dir.split(path.sep);
    let i=1;
    function next() {
        if (i>parts.length)
            return callback&&callback();
        let parent=parts.slice(0,i++).join(path.sep);
        fs.access(parent,err => {
            if (err) {
                fs.mkdir(parent,next);
            } else {
                next();
            }
        });
    }
    next();
}

async await 创建目录

async function mkdir(parent) {
    return new Promise((resolve,reject) => {
        fs.mkdir(parent,err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

async function access(parent) {
    return new Promise((resolve,reject) => {
        fs.access(parent,err => {
            if (err) reject(err);
            else resolve();
        });
    });
}
async function makepPromise(dir,callback) {
    let parts=dir.split(path.sep);
    for (let i=1;i<=parts.length;i++){
        let parent=parts.slice(0,i).join(path.sep);
        try {
            await access(parent);
        }catch(err) {
            await mkdir(parent);
        }

    }
}

// 同步删除目录

function rmSync(dir) {
    try {
        let stat = fs.statSync(dir);
        if (stat.isFile()) {
            fs.unlinkSync(dir);
        } else {
            let files=fs.readdirSync(dir);
            files
                .map(file => path.join(dir,file))
                .forEach(item=>rmSync(item));
            fs.rmdirSync(dir);
        }
    } catch (e) {
        console.log('删除失败!');
    }
}
rmSync(path.join(__dirname,'a'));

// 异步删除非空目录

function rmPromise(dir) {
    return new Promise((resolve,reject) => {
        fs.stat(dir,(err,stat) => {
            if (err) return reject(err);
            if (stat.isDirectory()) {
                fs.readdir(dir,(err,files) => {
                    let paths = files.map(file => path.join(dir,file));
                    let promises = paths.map(p=>rmPromise(p));
                    Promise.all(promises).then((() => fs.rmdir(dir,resolve)));
                });
            } else {
                fs.unlink(dir,resolve);
            }
        });
    });
}
rmPromise(path.join(__dirname,'a')).then(() => {
    console.log('删除成功');
})

*/



















/* function copy(src, target) {
  fs.readFile(src, function (err, data) {
    fs.writeFile(target, data);
  })
}

fs.appendFile(path.join(__dirname, 'new.txt'), 'append file', {}, (err, data) => {
  console.log(err)
  console.log(data)
})

const res = fs.writeFileSync(path.join(__dirname, 'new.txt'), 'i am new txt 同步')

fs.writeFile(path.join(__dirname, './new.txt'), 'hello wrold i am new txt', {}, (err, data) => {
  if (!err) {
    console.log(data, '写入成功')
  }
})  */



/* fs.readFile(path.join(__dirname, './text.txt'), {
  encoding: 'utf-8'
},(err, data) => {
  console.log(err, '异步 err')
  console.log(data, '异步')
})


const res = fs.readFileSync(path.join(__dirname, './text.txt'), {
  encoding: 'utf-8'
})

console.log(res, '同步') */