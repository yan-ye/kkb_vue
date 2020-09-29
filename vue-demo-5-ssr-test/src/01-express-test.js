const express = require('express')

const app = express()
app.get('/test', function(req,res){
    res.send('hello word')
})



app.listen(5050,function(){
    console.log('server runing')
})