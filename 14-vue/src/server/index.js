const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

app.use('/api/user/:api', (req, res) => {
    console.log(`接收到 ${req.method} 请求...`);
    const api = req.params.api
    switch (api) {
        case 'login':
            let { name } = req.body
            let json = {ok: 0, token: null}
            if (name === 'admin' || name === 'yanye') {
                json.ok = 1;
                json.token = name
            } 
            res.json(json)
            break;
        default:
            res.status(506).send(`unknown that ${api} api!`)
            break;
    }
})

app.listen(3000, () => {
    console.log('user api runing...')
})