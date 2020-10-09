import Vue from 'vue';

function create(Component, props) {
    //创建一个vue 实例
    let vm = new Vue({
        render(h) {
            console.log(h(Component,{props}))
            return h(Component, {props})
        }
    }).$mount();
    
    //追加到body
    document.body.appendChild(vm.$el)
    
    //添加销毁方法
    const comp = vm.$children[0]
    comp.remove = () =>{
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp

}

export default create


