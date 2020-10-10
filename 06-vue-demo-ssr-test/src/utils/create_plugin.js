
import notice11 from "@/components/notice.vue";

function create (Vue,cmop, pros) {
    let Comp = Vue.extend(cmop)
    let comp = new Comp({
        propsData: pros
    })
    comp.$mount()
    document.body.appendChild(comp.$el)

    comp.remove = () =>{
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    return comp
}


export default {
    install(Vue) {
        Vue.prototype.$notice = function(options) {
            return create(Vue, notice11, options)
        }
    }
}