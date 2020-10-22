import { login } from "@/api/user";

export const state = {
    token: localStorage.getItem('token'),
    roles: []
}

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setRoles(state, roles) {
        state.roles = roles
    }
}

export const actions = {
    login({ commit }, data) {
        // ==== 模拟接口 =====
        // return new Promise((resolve, reject) =>{
        //     login(data).then((response) => {
        //         if (response && response.ok) {
        //             commit('setToken', response.token)
        //             localStorage.setItem('token', response.token)
        //             resolve()
        //         }else {
        //             reject('用户名或密码错误!')
        //         }
        //     })
        // })

        return login(data).then((response) => {
            if (response.data && response.data.ok) {
                commit('setToken', response.token)
                localStorage.setItem('token', response.token)
            }
            return response.data
        })
        

        // ==== 模拟数据 =====
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         if (name === 'admin' || name === 'yanye') {
        //             commit('setToken', name)
        //             localStorage.setItem('token', name)
        //             resolve()
        //         } else {
        //             reject('用户名或密码错误!')
        //         }
        //     }, 1000);
        // })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            setTimeout(() => {
                commit('setToken', [])
                commit('setRoles', [])
                localStorage.removeItem('token')
                resolve()
            }, 0);
        })
    },
    getRoles({ state, commit }) {
        return new Promise(resolve => {
            setTimeout(() => {
                const roles = state.token === 'admin' ? ['admin'] : ['editor']
                commit('setRoles', roles)
                resolve(roles)
            }, 500);
        })

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}