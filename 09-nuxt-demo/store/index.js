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
        //当我们想将服务端的一些数据传到客户端时，这个方法非常好用
        //app 是server的实例  也就是express 的实例
        const token = app.$cookies.get('token')
        if(token){
            console.log('nuxtServerInit: token:' + token)
            commit("user/init", token);
        }
    }
}