// import router from '../../router'

export default store => {
    //store 初始化时状态持久化， 将储存在localStorage中的状态还原 
    if (localStorage) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            store.commit('user/login', user.username)
        }
    }
    //如果用户的相关状态发生变化自动存储到 localStorage
    //vuex api  subscribe  
    store.subscribe((mutation, state) => {
        //mutation 状态
        //{type: 'user/login'}
        //{type: 'user/logout'}
        if (mutation.type === 'user/login') {
            console.log(state, ">>>>>>>>>>");
            const user = JSON.stringify(state.user)
            localStorage.setItem('user', user)
        } else if (mutation.type === 'user/logout') {
            localStorage.removeItem('user')
        }
    })

} 