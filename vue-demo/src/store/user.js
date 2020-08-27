// export default {
//     namespaced: true, //设置独立的命名空间
//     //状态定义于state中
//     state: {
//         isLogin: false
//     },
//     //修改只能通过mutation 
//     mutations: {
//         login (state) {
//             state.isLogin = true
//         },
//         logout(state) {
//             state.isLogin = false
//         }
//     },
//     //action类似于mutation 不同的是： 一、action可以使异步操作  二、action提交的是mutation，而不是直接改变状态
//     // actions: {
//     //     //模拟异步修改数据
//     //    login({commit}, username) {
//     //        return new Promise( (resolve, reject) =>{
//     //            setTimeout(() => {
//     //                if(username === 'admin') {
//     //                    commit('login')
//     //                    resolve()
//     //                }else {
//     //                    reject()
//     //                }
//     //            }, 1000);
//     //        })
//     //    }
//     // }
// }

export default {
    namespaced: true,//设置独立的命名空间
    //状态定义于state中
    state: {
        isLogin: false,
        username: '',
        useRoutes: [
            {
              path: "/admin",
              name: "admin",
              component: () =>
                import(/* webpackChunkName: "admin" */ "../views/admin.vue"),
              meta: {
                auth: true,
              },

              children: [
                {
                  path: "/admin/detail/:name",
                  name: "adminDetail",
                  component: () =>
                    import(/* webpackChunkName: "detail" */ "../views/detail.vue"),
                },
              ],
              //路由守卫作用于单个路由
              // beforeEnter(to, from, next) {
              //   if(window.isLogin) {
              //     next()
              //   }else {
              //     next('/login?redirect='+ to.fullPath)
              //   }
              // }
            },
          ]
    },
    //修改只能通过mutation 
    mutations: {
        login(state, username) {
            state.isLogin = true,
                state.username = username
        },
        logout(state) {
            state.isLogin = false
            state.username = ''
        }
    },
    //action类似于mutation 不同的是： 一、action可以使异步操作  二、action提交的是mutation，而不是直接改变状态
    actions: {
        login({ commit }, username) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login', username)
                        resolve()
                    } else {
                        reject()
                    }
                }, 1000);
            })
        }
    },
    getters: { //派生出欢迎信息
        welcome: (state) => {
            return state.username + ', 欢迎回来'
        }
    }

}



