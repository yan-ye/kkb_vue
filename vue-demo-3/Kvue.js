


//数据劫持 做响应化处理

function defineReactive(obj, key, val) {
   
    //递归一下值 ---> val
    observe(val)

    //创建哟个dep
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            console.log(dep,key, '>>>>>',newVal,1111);
            //递归一下新设置的值 ---> newVal
            observe(val)
            val = newVal
            dep.notify()
        }
    })
}


//观察数据函数
function observe(obj) {
    if (typeof obj !== 'object' || obj == undefined) {
        return
    }
    //实例化观察数据的类
    new Observe(obj)
}

//代理函数 方便用户访问数据
function proxy(vm, soureceKey) {
    Object.keys(vm[soureceKey]).forEach(key =>{
        //循环遍历 vm[soureceKey]  也就是 vue的$data   拿到其中的key   然后把key挂载到 vm 也就是 vue 上 方便用户访问
        Object.defineProperty(vm, key, {
            get(){
                return vm[soureceKey][key]
            },
            set(newVal) {
                vm[soureceKey][key] = newVal
            }
        })
    })
}

class Kvue {
    constructor(options) {
        //保存所有传入的数据
        this.$options = options
        //单独取出data
        this.$data = options.data

        //响应化
        observe(this.$data)

        //代理data 方便用户访问数据
        proxy(this, '$data')

        //编译
        new Compiler(options.el, this)

    }
}

//观察数据的类
class Observe {
    constructor(data) {
        this.data = data;
        //如果data是对象
        if (typeof this.data === 'object') {
            this.walk(this.data)
        }
    }
    //数据是对象的处理方式
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })

    }

}

// const watchers = []; //临时保存watcher
// //监听器：负责更新视图
// //每个响应化的key对应一个watcher
// class Watcher{
//     constructor(vm, key, updateFn){
//         //Kvue实例
//         this.vm = vm,
//         //key
//         this.key = key,
//         //更新函数
//         this.updateFn = updateFn
//         watchers.push(this)
//     }
//     update() {
//         this.updateFn.call(this.vm, this.vm[this.key])
//     }
// }


const watchers = [] //临时保存数据
//监听器  观赏数据更新试图
class Watcher{
    constructor(vm, key, updateFn){
        //vue 实例
        this.vm = vm;
        //key
        this.key = key,
        //保存更新函数
        this.updateFn = updateFn
        // watchers.push(this)
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    //对外提供一个更新函数
    update(){
        //掉用传过来的更新函数 并且传值
        this.updateFn.call(this.vm, this.vm[this.key])
    }

}

//dep 依赖收集
class Dep {
    constructor(){
        this.deps = []
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach(dep =>{
            dep.update()
        })
    }
}