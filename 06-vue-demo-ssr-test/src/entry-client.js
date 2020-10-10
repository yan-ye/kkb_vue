//客户端也需要创建Vue实例

const { createApp } = require("./main");

const {app, router} = createApp()

router.onReady(() =>{
    //挂载激活
    app.$mount('#app', true)
})