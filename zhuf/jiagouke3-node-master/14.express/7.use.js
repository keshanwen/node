const express = require('./express');
const app = express();
const path = require('path');
// koa-bodyparser     body-parser
app.use((req,res,next)=>{
    setTimeout(()=>{
        next();
    },3000)
})



app.get('/', function(req, res) {
    // console.log(req.path,req.query);
    setTimeout(()=>{
        res.sendFile(path.resolve(__dirname,'package.json')); // ctx.body 
    },1000)
})

app.listen(3000, function() {
    console.log(`server start 3000`)
})