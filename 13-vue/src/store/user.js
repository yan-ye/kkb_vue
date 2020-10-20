
const state = {
    token: localStorage.getItem('token'),
    roles: []
}

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setRoles(state, roles) {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { userName } = userInfo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userName === 'admin' || userName === 'yanye') {
                    commit('setToken', userName)
                    localStorage.setItem('token', userName)
                    resolve()
                } else {
                    reject('用户名活密码错误')
                }
            }, 1000);
        })
    },
    getInfo({ commit }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = state.token === 'admin' ? ['admin'] : ['editor']
                commit('setRoles', roles)
                resolve({ roles })
            }, 1000);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}