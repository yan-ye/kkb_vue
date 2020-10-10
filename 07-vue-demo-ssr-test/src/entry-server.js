
import { createApp } from "./main"

//返回一个函数  接收上下文 返回创建的Vue实例
export default context => {
    //返回promise 保证异步操作完成
    return new Promise((resolve, reject) =>{
        const {app, router} = createApp(context)
        router.push(context.url)
        router.onReady(() =>{
            resolve(app)
        },reject)
    })
}