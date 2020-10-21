const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

app.get('/api/:api', (req, res) =>{
    const api = req.params.api
    switch (api) {
        case 'user':
            res.join({name:'yanye',age: '10'})
            break;
    
        default:
            res.status(506).send(`unknown that ${api} api!`)
            break;
    }
}) 

app.listen(3000, () =>{
    console.log('user api runing...')
})