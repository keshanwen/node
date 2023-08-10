const {buildSchema,graphql} = require('graphql')

// 1.定义一个数据的骨架 用来描述我拿到数据的一个格式
const schema = buildSchema(`
    # 默认表示我们有一个查询的入口
    type Query{
        name:String
        age:Int
    }
`)
// 2.定义查询出来的数据内容和结果
const rootValue = {
    name(){
        return 'zf'
    },
    age(){
        return 12
    }
};
// 3.根据查询语句查询出对应的结果
(async ()=>{
    let r = await graphql(schema,`query getSchool {name}`,rootValue);
    console.log(r)
})()


// 4.我们期望将这种方式变成客户端提供查询语句，访问服务端，服务端 查询后返回结果