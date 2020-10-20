//引入router
import {router, constantRouters} from './router'

//创建白名单
const whiteList = [].concat(constantRouters.map(item => item.path));

router.beforeEach((to, from, next) => {
    let hasToken = localStorage.getItem('token');
    if(hasToken) { //已登录
        //如果还是去login没有必要 重置到首页 否则直接放行
        if(to.path === 'login') { 
            next('/')
        }else {
            next()
        }
    }else { //未登录
        //如果去不白名单的直接放行  否则重置到登录页面
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login?redirect=' + to.path) 
        }
    }
})



