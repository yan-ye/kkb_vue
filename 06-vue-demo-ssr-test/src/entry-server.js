//调用刚才在min里面的工厂函数

import { createApp } from "./main"


//该函数会被express路由处理函数调用   用于创建vue实例
export default context =>{
    //确保异步完成
    return new Promise((resolve, reject) =>{
        const {app, router} = createApp 
        //显示首屏处理
        router.push(context.url)
        //检测路由就绪时间
        router.onReady(() =>{
            resolve(app)
        }, reject)
    })

}