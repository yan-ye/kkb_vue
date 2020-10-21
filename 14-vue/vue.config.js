const port = 6060
module.exports = {
    publicPath:'/',
    devServer:{
        port,
    },
    configureWebpack: {
        name: 'Vue 实践'
    }

}