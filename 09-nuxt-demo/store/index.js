export const state = () => {
    token: ''
}

export const mutations = {
    init(state, token) {
        state.token = token
    }
}


export const actions = {
    nuxtServerInit({ commit }, { app }) {
        console.log(app, '>>>>')
        // const token = app.$cookise.get('token')
        // if(token){
        //     console.log('nuxtServerInit: token:' + token)
        //     commit("user/init", token);
        // }
    }
}