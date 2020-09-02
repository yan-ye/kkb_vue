import Vue from 'vue';
import Notice from '@/components/notice.vue'

 function create(component, prop) {
    const vm = new Vue({
        render(h) {
            return h(component, { props:prop })  //return 返回虚拟DOM
        }
    }).$mount() //挂载但未指定 执行初始化工作 但是不追加DOM

    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]; //组件实例

    comp.remove = () => {
        document.body.removeChild(vm.$el)
        comp.$destroy()
    }

    return comp
}

export default {
    install (Vue) {
        Vue.prototype.$notice = function (options) {
            return create (Notice, options)
        } 
    }
} 
