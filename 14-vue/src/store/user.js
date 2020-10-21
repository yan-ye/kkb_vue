
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
    login({ commit }, { name }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'admin' || name === 'yanye') {
                    commit('setToken', name)
                    localStorage.setItem('token', name)
                    resolve()
                } else {
                    reject('用户名或密码错误!')
                }
            }, 1000);
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve =>{
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