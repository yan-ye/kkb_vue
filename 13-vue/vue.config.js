const path = require('path');
const port = 7070
const title = 'Vue实践'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/best-practice',
    devServer: {
        port
    },
    configureWebpack: {
        name: title
    },
    chainWebpack(config) {
        //1.修改当前项目默认svg配置： 排除掉icons目录
        config.module.rule('svg')
        .exclude.add(resolve('./src/icons'))

        //2.新增一个rule: 添加icons里面svg
        config.module.rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('./src/icons')).end()
        .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId:'icon-[name]'})
    
    }
}