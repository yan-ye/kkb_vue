import Vue from "vue";

function create(comp, props) {
    let Comp = Vue.extend(comp)
    let cmp = new Comp({propsData: props}).$mount()
    document.body.appendChild(cmp.$el)
    cmp.remove = () =>{
        document.body.removeChild(cmp.$el)
        cmp.$destroy()
    }
    return cmp
}
export default create
