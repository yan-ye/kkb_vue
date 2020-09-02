let Vue


class Store {
    constructor (options) {
        // this.$options = options
        Vue.util.defineReactive(this, 'state', options.state)
    }
}
function install (_vue) { 
    Vue = _vue;
    Vue.mixin({
        beforeCreate () {
            if(this.$options.store) {
                console.log(this.$options.store.state);
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}

//vuex
export default {
    Store,
    install
}