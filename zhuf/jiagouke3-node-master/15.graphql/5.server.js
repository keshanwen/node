const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const typeDefs = gql`     
    type Teacher{
        name:String,
        title:String,
        id:ID
    }
    type Query{
        name:String,
        age:Int,
        teachers:[Teacher]
        getTeacher(id:ID):Teacher
    }
`
const teachers = [
    { name: 'jw', title: '讲师', id: '001', home: { address: '天龙苑' } },
    { name: 'zry', title: '专家', id: '002', home: { address: '天通苑' } }
]
const resolvers = {
    Query: {
        name: () => 'zf',
        age: () => 12,
        teachers: () => teachers,
        getTeacher(parent, args, context) { // parent是父查询 , args是用户的参数 ,context是查询的上下文
            return teachers.find(item=>item.id == args.id)
        }
    }
};
(async () => {
    const app = express(); // 获取请求监听韩式 websocket
    const httpServer = http.createServer(app);
    let server = new ApolloServer({
        typeDefs,
        resolvers,
        plugin: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context:({req})=>{
            // 每次访问graphql的服务的时候 都会执行此函数
            // 我们需要将用户的请求进行格式化操作，格式化后返回作为上下文对象
           return {
               token:req.headers.authorization
           }
        }
    })
    await server.start();
    server.applyMiddleware({ app }); // 应用中间件 , 让apollo 和 expresss关联起来
    await new Promise(resolve => httpServer.listen(3000, resolve));
    console.log(`server start 3000`)
})();



// 我们一般在用apollo的时候 还是会和主流的框架在一起使用 express . koa