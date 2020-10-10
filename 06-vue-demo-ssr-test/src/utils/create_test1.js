import Vue from "vue";

function create(com, props) {
    let vm = new Vue({
        render(h) {
            console.log(h(com))
            return h(com, {props})
        }
    }).$mount()
    document.body.appendChild(vm.$el)

    let comp = vm.$children[0]
    comp.remove = () =>{
        document.body.removeChild(vm.$el)
        comp.$destroy()
    }
    return comp
}

export default create