export const state = () => {
    token: ''
}

export const mutations = {
    init(state, token) {
        state.token = token
    }
}

export const actions = {
    login({ commit }, u) {
        return this.$axios.$post('/api/login', u).then(({ token }) => {
            if (token) {
                console.log(token, '>>>666666>>>')
                commit('init', token)
            }
            return 'ok'
        })
    }
}