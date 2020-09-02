
let Vue;
class KvueRouter {
    constructor(options) {
        this.$options = options;
        Vue.util.defineReactive(this, 'current', '/')
        // this.current = '/'
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange () {
        this.current = window.location.hash.slice(1)
    }
}
KvueRouter.install = function (_vue) {
    Vue = _vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                console.log(this.$options.ss, '>>>>>>',this.$options.router);
            }
        },
    })
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                default: ''
            },
        },
        render(h) {
            // <a herf="/xxx"></a>
            return h(
                'a',
                { attrs: { href: "#" + this.to } },
                this.$slots.default
            )
        }

    })

    Vue.component('router-view', {
        props: {
            to: {
                type: String,
                default: ''
            },
        },
        render(h) {

            let comp = null
            this.$router.$options.routes.forEach(router =>{
                if(this.$router.current === router.path) {
                    comp = router.component
                }
            })
        
           
            // <a herf="/xxx"></a>
            return h(comp)
        }

    })

}
export default KvueRouter