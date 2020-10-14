const express = require('express')
const favicon = require('serve-favicon')
var bodyParser = require('body-parser');
const app = express()
const path = require('path')

app.use(favicon(path.join(__dirname, '../static/favicon.ico')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/:cmd', (req, res) => {
    const cmd = req.params.cmd
    if (cmd) {
        switch (cmd) {
            case 'cart':
                let data = {}
                setTimeout(() => {
                    data.statusCode = 200
                    data.fruit = [
                        { name: '苹果', price: "3元/kg" },
                        { name: '香蕉', price: "2元/kg" },
                        { name: '哈密瓜', price: "2元/kg" },
                        { name: '橘子', price: "5元/kg" },
                        { name: '西瓜', price: "4元/kg" },
                    ]

                    res.json(data)
                }, 500);
                break;
            case 'login':
                console.log(req.body, '>>>>>>')
                setTimeout(() => {
                    res.cookie('token', 'yanye')
                    res.json({token:1})
                }, 1000);
                break;
            default:
                res.status(500).json({ statusCode: 500, message: 'not find that api' })
                break;
        }

    } else {
        res.status(500).json({ statusCode: 500, message: 'not find that api' })
    }
})




app.listen(8089, () => {
    console.log('api server runing...')
})