import Vue from 'vue'
function create(component, props) {
   const vm =  new Vue({
        render(h) {
           return h(component, {props})  //return 返回虚拟DOM
        }
    }).$mount()  //挂载但未指定目标 只执行初始化工作 不追加DOM

    //将生成的都买追加到body
    document.body.appendChild(vm.$el)

    //实例
    const comp = vm.$children[0];

    //挂在就要销毁
    comp.remove = () =>{
        //删除appendchildren产生的DOM
        document.body.removeChild(vm.$el)
        //销毁实例
        vm.$destroy()
    }

    //返回实例
    return comp
}

//导出create
export default create