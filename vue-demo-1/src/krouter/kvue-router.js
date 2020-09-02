
let Vue;
import link from './krouter-link'
// 实现一个插件: 挂载$router
class KVueRouter {
    constructor(options) {
        this.$options = options
        this.current = '/'

        //需要创建响应式的current属性
        //利用Vue提供的defineReactive做响应   这样的current变化时 依赖他的组将就会重新render
        Vue.util.defineReactive(this, 'current', '/')
       
        //监控url hash值得变化
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))

        //路由映射表
        this.routerMap = {}
        options.routes.forEach( router =>{
            this.routerMap[router.path] = router
        })

    }
    onHashChange () {
        this.current = window.location.hash.slice(1)
    }
}

//静态方法
KVueRouter.install = function (_vue) {
    Vue = _vue;
    //挂载$router
    //whay？ 怎么获取根实例中的router   --- 混入 mixin
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        },
    })


    //实现两个全局组件 router-link   router-view
    Vue.component('router-link', link)
    // Vue.component('router-link', {
    //     props: {
    //         to: {
    //             type: String,
    //             required: true
    //         },
    //     },
    //     //<a herf="#/home">abc</a>
    //     //<router-link to='/home'>abc</router-link>
    //     render(h) {
    //         return h(
    //             'a',
    //             { attrs: { href: '#' + this.to } },
    //             this.$slots.default
    //         )
    //     }
    // })
    Vue.component('router-view', {
        render(h) {
            const {routerMap, current} = this.$router
            const component = routerMap[current].component || null;
            return h(component)
        }
    })
   
}

export default KVueRouter