import { constantRouters, asyncRouters } from "../router"

export const state = {
    routes: [],//完整的路由表
    addRoutes: []//角色可访问的路由表
}

export const mutations = {
    setRouter(state, routes) {
        state.addRoutes = routes;
        state.routes = constantRouters.concat(routes)
    }

}
export const actions = {
    generateRouter({ commit }, roles) {
        return new Promise((resolve,) => {
            const accessRouters = filterRouters(asyncRouters, roles)
            commit('setRouter', accessRouters)
            resolve(accessRouters)
        })
    }

}

export function filterRouters(routers, roles) {
    let res = []
    //复制一份
    routers.forEach((route) => {
        const temp = { ...route }
        //如果有权限则添加到路由表
        if (hasPermission(temp, roles)) {
            if (temp.children) {
                filterRouters(temp.children, roles)
            }
            res.push(temp)
        }
    })

    return res
}

export function hasPermission(route, roles) {
    if (route.meta && route.meta.roles) {
        return roles.some((role => route.meta.roles.includes(role)))
    } else {
        return true
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}