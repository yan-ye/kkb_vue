import { asyncRoutes, contentRoutes } from "@/router";

export const state = {
    routes: [],
    addRoutes: []
}

export const mutations = {
    setRoutes(state, routes) {
        state.routes = contentRoutes.concat(routes)
        state.addRoutes = routes
    }
}

export const actions = {
    getAccessRoutes({ commit }, roles){
        return new Promise(resolve =>{
            setTimeout(() => {
                const accressRoutes = filerRoutes(asyncRoutes, roles)
                commit('setRoutes', accressRoutes)
                resolve(accressRoutes)
            }, 500);
        })
    }
}
function filerRoutes(asyncRoutes, roles) {
    let res = []
    asyncRoutes.forEach(route => {
        //复制一份
        const temp = {...route}
        if(hasPermission(temp, roles)) {
            if(temp.children){
                filerRoutes(temp.children, roles)
            }
            res.push(temp)
        }
    });
    return res
}

function hasPermission(route , roles) {
    if(route.meta && route.meta.roles && route.meta.roles.lenght > 0){
       return route.meta.roles.some(route => roles.includes(route))

    }else {
        return true
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}