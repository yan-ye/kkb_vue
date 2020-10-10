
import Vue from "vue";

function create (cmop, pros) {
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

export default create