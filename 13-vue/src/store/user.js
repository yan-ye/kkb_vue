
const state = {
    token: localStorage.getItem('token')
}

const mutations = {
    setToken(state, token) {
        state.token = token
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}