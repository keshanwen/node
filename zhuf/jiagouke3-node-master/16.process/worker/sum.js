let sum = 0;
for(let i = 0; i < 100 * 100 * 10000;i++){
    sum += i;
}
// console.log  process.stduout.write 是调用的同一个方法
// process.stderr.write

process.stdout.write(process.argv.slice(2).toString())

process.stdout.write('sum:' + sum)


process.stdin.on('data',function(data){
    console.log(data.toString(),'SON')
})