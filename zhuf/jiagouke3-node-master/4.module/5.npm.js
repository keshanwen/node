// 第三方模块 第三方模块 需要通过npm install 来安装
// npm node package manager node的包管理器

// 第三方模块分为两种 全局模块  本地模块

// 通过npm install -g 来安装的是全局模块 ，安装后只能在命令行中使用
// 默认安装包 都是通过官方的npm源来下载内容
// npm root -g 可以看到安装的位置

// C:\Users\test1\AppData\Roaming\npm\nrm -> C:\Users\test1\AppData\Roaming\npm\node_modules\nrm\cli.js 软链

// npm 在我们当前的path环境变量中可以直接在命令行中执行
// 表示用node环境来执行文件

// 全局安装后只能在命令行中使用  nvm 可以切换node版本  3n  npm \ nrm \ nvm-vin

// const NRMRC = path.join(process.env.HOME, '.nrmrc');
// const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');


// 我们希望自己编写一个全局包 
// 1.初始化包的信息  npm init -y 可以初始化一系列的信息
// 2.定义一个运行入口  bin一般表示存放的都是可执行文件
// 3.配置命令 执行对应的脚本
// 4.增加执行命令的header #!/usr/bin/env node
// 4.将包临时放在全局上  npm link 即可使用

// npm i zf-module-test -g
// zf-module-test


console.log(module.paths); // 无法找到全局下的模块，第三方模块在代码中使用 会依次向上查找node_modules文件夹

// 代码中使用的依赖
// 开发依赖 只在开发中使用 --save-dev  （webpack  gulp ）  如果两个库中依赖了不同版本的内容会共存，但是一般在开发的时候我们会采用高版本盖掉低版本
// 生产依赖 --save 上线开发都需要
// peerDependencies 同等依赖， 我开发的项目中 需要依赖一个xx版本 (提示作用)
// 可选依赖  (爱装不装)
// 打包依赖

// 默认安装后会生成一个文件 package-lock.json 锁定版本的文件 （为了保证我安装的版本和你的版本一致 ） 为了锁定版本  （保证前后安装的结果是一致的）

// 版本号的问题  (major.minor.patch)
// ^5.0.0   当前这个大版本只能是5 后面可以比当前版本更高 5.2.0
// ~5.2.0 前两位 只能是5.2 最后一位只要比当前大就可以了
// >=
// <= 
// 1.0.0~2.0.0

// 还有特殊的版本 从2 - 3版本 （alpha版本内部测试不给人用 beta版本 (公测版本) -》 rc版本 -》 正式发布）  3.0.0-beta0.4


// 执行命令的问题 有一些模块并不会安装到全局下 
// 当我们运行 npm run 命令的时候 会将当前项目下的node_modules/.bin 文件夹放在全局下,但是执行完毕后就销毁了
// npx  npm5.2 以上提供的命令 如果包不存在会安装，执行后就销毁他 同时也会将node_modules/.bin目录放到全局下

// 一般情况会用npm run 因为npm run 命令可以写到配置文件中