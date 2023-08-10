const express = require('./express');


const app = express();
app.param('id',function(req,res,next,value,key){ // {id:[fn1,fn2],name:[fn1,fn2]}
    console.log(1 + 'id');
    next();
})
app.param('id',function(req,res,next,value,key){
    console.log(2+ 'id');
    next();
})
app.param('name',function(req,res,next,value,key){
    console.log(1+'name');
    next();
    
})
app.param('name',function(req,res,next,value,key){
    console.log(2+'name');
    next();
})
app.get('/user/:name/:id',function(req,res){ // this.keys = [name,id]
    res.end(JSON.stringify(req.params))
})
app.get('/user',function(req,res){
    res.end('user')
})
app.listen(3000, function() {
    console.log(`server start 3000`)
})