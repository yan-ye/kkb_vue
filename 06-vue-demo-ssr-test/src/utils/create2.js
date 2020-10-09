import Vue from 'vue';

function create(Comp, props) {
    let vm = new Vue({
        render(h){
           console.log(h(Comp, {props}));
            return h(Comp, {props})
        }
    }).$mount()

    //追加dom
    document.body.appendChild(vm.$el)

    //获取实例
    let comp = vm.$children[0]

    comp.remove = () =>{
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp

}

export default create