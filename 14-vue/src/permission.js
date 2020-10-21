import { router, contentRoutes } from './router'
import store from './store'

//白名单
const whiteList = contentRoutes.map(item => item.path)

router.beforeEach(async (to, from, next) => {
    const hasToken = localStorage.getItem('token')
    if (hasToken) {//已登录
        if (to.path === '/login') {
            next('/')
        } else {
            //先获取一下role 找到说明一定加载过了
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    if (whiteList.indexOf(to.path) !== -1) {
                        next()
                    } else {
                        //获取角色信息
                        const roles = await store.dispatch('user/getRoles')
                        //根据角色 动态获取可访问的路由表
                        const accessRoutes = await store.dispatch('permission/getAccessRoutes', roles)
                        console.log(accessRoutes, '>>>>>');
                        //动态添加路由
                        router.addRoutes(accessRoutes)
                        //切换路由 即 放行
                        next({ ...to, replace: true })
                    }
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                    alert(error || 'unknow error')
                }
            }
        }
    } else {//未登录
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login?redirect=' + to.path)
        }
    }
})