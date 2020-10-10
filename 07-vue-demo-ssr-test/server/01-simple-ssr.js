const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')


function resolve(dir) {
    return path.join(__dirname, dir)
}

//处理图标
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))


//开方dist/client 目录
app.use(express.static(resolve('../dist/client'), { index: false }))

//渲染器
const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))
const renderer = createBundleRenderer(bundle, {
    // runInNewContext: 'once',  // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template: fs.readFileSync(resolve('../public/index.html'), 'utf-8'), // 宿主文件
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json')) // 客户端清单
})


app.get('*', async (req, res) => {
    const context = {
        url: req.url,
        title: 'ssr test'
    }
    try {
        const html = await renderer.renderToString(context)
        res.send(html)
    } catch (err) {
        console.log('>>>>>', err);
        res.status(500).send('Internal Server Error!')
    }
})


app.listen(3000, () => {
    console.log('server runing...')
})