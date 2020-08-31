import Vue from 'vue';


function create(component, props) {
    
    const Action = Vue.extend(component);//获得一个构造函数

    const div = document.createElement('div')//创建一个dom用于挂载

    document.body.appendChild(div)//向body天剑穿件的DOM

    const vm =  new Action({//构造出一个实例

        propsData: props //参数需要由propsData接收

    }).$mount(div) //挂载于创建的DOM

    vm.remove = ()=>{
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return vm
}

export default create

