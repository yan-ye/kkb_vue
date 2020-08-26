const express = require('express')
const app = express();

app.get('/api/courtes', (req, res) =>{
    setTimeout(() => {
        res.send([{name:'web全栈'}, {name:'web高级'}]);
    }, 1000);
})
let serve =  app.listen(3000, (host) =>{
    var host = serve.address().address;
    var port = serve.address().port;
    console.log('api 启动成功 at http://%s:%s', host, port);
})
