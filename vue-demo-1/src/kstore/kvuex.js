let Vue;
//
class Store {

    constructor(options) {
        //响应化处理state =====> 1
        this.state = new Vue({
            data: options.state
        })
         //响应化处理state =====> 2
        // Vue.util.defineReactive(this, 'state', options.state)
    }
}


function install(_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                console.log(this.$options.store);
                Vue.prototype.$store = this.$options.store
            }
        },
    })

}
//
export default {
    Store,
    install
}