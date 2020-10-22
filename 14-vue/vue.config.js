const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)    
}
const port = 6060
module.exports = {
    publicPath:'/',
    devServer:{
        port,
        proxy:'http://192.168.9.109:3000/'
    },
    configureWebpack: {
        name: 'Vue 实践'
    },
    chainWebpack: config =>{
        //让默认的svg rule排除掉自定义icons 文件
        config.module
        .rule('svg')
        .exclude
        .add(resolve('./src/icons'))

        //新建一个icon rule  使用 svg-sprite-loader
        config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('./src/icons')).end()
        .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId: 'icon-[name]'})
          
    }

}