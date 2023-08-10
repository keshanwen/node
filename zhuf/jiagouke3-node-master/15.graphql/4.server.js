const {buildSchema} = require('graphql');
// String Int Float Boolean ID  自定义类型
const schema = buildSchema(`
    # 如果没有给对应的值 稍后查询的结果就是null 类型
    type Home {
        id:ID
        address:String,
    }
    type Teacher {
        name:String,
        title:String
        id:ID
        home:Home
    }
    type Query{
        name:String
        age:Int
        isOpen:Boolean 
        id:ID,
        teachers:[Teacher]
        teacher(id:ID,name:String):Teacher!
    }
    # 其他的除了查询 修改、增加, 参数必须是input类型
    input HomeInput{
        id:ID
        address:String
    }
    input TeacherInput {
        name:String,
        title:String
        id:ID
        home:HomeInput
    }
    type Mutation {
        addTeacher(teacher:TeacherInput):Teacher
        updateTeacher(id:ID,teacher:TeacherInput):Teacher
    }
`)
const teachers = [
    {name:'jw',title:'讲师',id:'001',home:{address:'天龙苑'}},
    {name:'zry',title:'专家',id:'002',home:{address:'天通苑'}}
]
const rootValue = {
    name(){
        return 'zf'
    },
    age(){
        return '12'
    },
    id(){
        return 123; //  ID类型就是字符串, 查询的时候会做校验
    },
    teachers(){
        return teachers
    },
    teacher({id,name}){
        return teachers.find(teacher=>teacher.id == id);
    },
    addTeacher({teacher}){
        teachers.push(teacher);
        return teacher
    },
    updateTeacher({id,teacher}){
        let idx =  teachers.findIndex(teacher=>teacher.id == id);
        teachers.splice(idx,1,teacher)
        return teacher
    }
}
const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
// 前端发送的请求 如果是访问graphql服务器必须是post请求
app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql:true, // 启用调试工具  , 可以帮你快速查看你的代码是否 ok
}));
app.use(express.static(__dirname)); // koa-static 一样的是express中内置的静态服务中间件
app.listen(3000,()=>{
    console.log('server start 3000')
})