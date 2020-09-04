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

        //保存用户定义的mutation方法
        this._mutations = options.mutations || {}
        this._actions = options.actions || {}

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    
    commit (type, payload) {
        let entry = this._mutations[type] 
        if(!entry) {
          return console.error('unknown mutation type', type);
        } 
        entry(this.state, payload)
    }
    dispatch (type, payload) {
        let entry = this._actions[type]
    
        if(!entry) {
          return console.error('unknown _actions type', type);
        }
        entry(this, payload)
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