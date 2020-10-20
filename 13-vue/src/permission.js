//引入router
import { router, constantRouters } from './router'
import store from './store'

//创建白名单
const whiteList = [].concat(constantRouters.map(item => item.path));

router.beforeEach(async (to, from, next) => {
    let hasToken = localStorage.getItem('token');
    if (hasToken) { //已登录
        //如果还是去login没有必要 重置到首页 否则直接放行
        if (to.path === 'login') {
            next('/')
        } else {
            //根据用户角色做处理的逻辑
            //1.获取用户角色  2.根据角色动态添加组件
            let hasRoles = store.getters.roles && store.getters.roles.length > 0
            console.log(hasRoles, '>>');
            if (hasRoles) {
                next()
            } else {
                try {
                    //获取用户角色
                    const { roles } = await store.dispatch('user/getInfo')
                    console.log(roles, '<<<<');

                    //根据角色过滤出可访问的路由
                    const accessRouters = await store.dispatch('permission/generateRouter', roles)

                    console.log('<><><><><><><>', accessRouters);

                    //添加到路由
                    router.addRoutes(accessRouters)
                    console.log('...to', {...to});

                    //路由切换
                    next({ ...to, replace: true })

                } catch (error) {
                    //令牌出错 网路出错等
                    // await store.dispatch('user/resetToken')
                    next('/login?redirect=' + to.path)
                    alert(error || 'unknown Error!wr')
                }
            }
        }
    } else { //未登录
        //如果去不白名单的直接放行  否则重置到登录页面
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login?redirect=' + to.path)
        }
    }
})



