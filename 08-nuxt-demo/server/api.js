const express = require('express')
const app = express()
app.use('/api/:cmd', (req, res) => {
    let cmd = req.params.cmd
    switch (cmd) {
        case "goods":
            let join = {
                y1: { name: 'y1', age: 1 },
                y2: { name: 'y2', age: 2 },
                y3: { name: 'y3', age: 3 },
            }
            res.send(join)
            break;
        case "login":
            res.json({
                stats:'ok',
                token:'yanye1234'
            })
            break;
        default:
            res.send('404 not find')
            break;

    }
})

app.listen(8080, () => {
    console.log('api runing...')
})
