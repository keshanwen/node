const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

// 基本用法差一个自定义指令

// -> library (书的分类) -> book   -》 分成对应的类 -》 作者
const typeDefs = gql`  
    type Author{
        name:String @deprecated(reason:"username")
    }
    type Book{
        title:String,
        author:Author
    }
    type Library {
        branch:String!
        books:[Book]
    }
    type Query{
        libraries:[Library]
    }
`
const libraries = [{ branch: '后端' }, { branch: '前端' }];
const books = [
    {title:"java语言程序设计",branch: '后端',author:'xxx'},
    {title:"javascript高级程序设计",branch: '前端',author:'ooo'}
]
// resolvers 是一个链式调用 libraries -》  Library =》 Book =》 Author
const resolvers = {
    Query:{
        libraries:()=> axios.get('/') // 查询所有接口
    },
    Library:{
        books(parent,args,context){ // parent就是父查询  args = {offset,limit}
            return books.filter(book=> book.branch == parent.branch) // 根据分类查询内容
        }
    },
    Book:{
        author(parent){
            return {name:parent.author}
        }
    },
    Mutation:{
        deleteBook:()=>{
            
        }
    }
};
(async () => {
    const app = express();
    const httpServer = http.createServer(app);
    let server = new ApolloServer({
        typeDefs,
        resolvers,
        plugin: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({ req }) => {
            return {
                token: req.headers.authorization
            }
        }
    })
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen(3000, resolve));
    console.log(`server start 3000`)
})();



// 我们一般在用apollo的时候 还是会和主流的框架在一起使用 express . koa