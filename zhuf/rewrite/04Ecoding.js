/*
  计算机内部，所有信息最终都是一个二进制值
  每一个二进制位（bit）有0和1两种状态，因此八个二进制位就可以组合出256种状态，这被称为一个字节(byte)

  8位 = 1字节
  1024字节 = 1K
  1024K = 1M
  1024M = 1G
  1024G = 1T

  javascript 中的进制

  let a = 0b10100;//二进制
  let b = 0o24;//八进制
  let c = 20;//十进制
  let d = 0x14;//十六进制
  console.log(a == b);
  console.log(b == c);
  console.log(c == d);

  进制转换
  10进制转任意进制 10进制数.toString(目标进制)
  console.log(c.toString(2));

  任意进制转十进制 parseInt('任意进制字符串', 原始进制)
  console.log(parseInt('10100', 2));

  console.log(parseInt('10100', 2));
*/
