import { Controller } from 'egg';
/*
1.什么是UUID?
UUID 是 通用唯一识别码（Universally Unique Identifier）的缩写
UUID是由一组32位数的16进制数字所构成，
故UUID理论上的总数为16^32 = 2^128，约等于3.4 x 10^38。
也就是说若每纳秒产生1兆个UUID，要花100亿年才会将所有UUID用完。

2.UUID的作用
UUID的是让分布式系统中的所有元素都能有唯一的辨识信息，
而不需要通过中央控制端来做辨识信息的指定。
如此一来，每个人都可以创建不与其它人冲突的UUID。
在这样的情况下，就不需考虑数据库创建时的名称重复问题

3.UUID版本
UUID主要有五个算法，也就是五种方法来实现：
1、uuid1()——基于时间戳
       由MAC地址、当前时间戳、随机数生成。可以保证全球范围内的唯一性，
       但MAC的使用同时带来安全性问题，局域网中可以使用IP来代替MAC。
2、uuid2()——基于分布式计算环境DCE（Python中没有这个函数）
        算法与uuid1相同，不同的是把时间戳的前4位置换为POSIX的UID。
        实际中很少用到该方法。
3、uuid3()——基于名字的MD5散列值
        通过计算名字和命名空间的MD5散列值得到，保证了同一命名空间中不同名字的唯一性，
        和不同命名空间的唯一性，但同一命名空间的同一名字生成相同的uuid。
4、uuid4()——基于随机数
        由伪随机数得到，有一定的重复概率，该概率可以计算出来。
5、uuid5()——基于名字的SHA-1散列值
        算法与uuid3相同，不同的是使用 Secure Hash Algorithm 1 算法

3.如何生成UUID
https://www.npmjs.com/package/uuid
* */
export default class HomeController extends Controller {
  public async index() {

  }
}
