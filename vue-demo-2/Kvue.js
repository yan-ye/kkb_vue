


//拦截数据 做响应式数据
function defineReactive(obj, key, val) {
    //递归
    observe(val)
    //创建一个dep和当前的key一一对应
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key, val);
            //依赖收集  
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set (newval){
            observe(newval)
            val = newval
            console.log('set', key, newval);
            console.log(watchers,'ddddddd');
            // watchers.forEach(watcher => watcher.update())
            dep.notify()
        }
    })
}

function observe(obj) {
    if(typeof obj !== 'object' || obj == null) {
        return
    }
    //实例化observe
    new Observe(obj)
}

class Kvue{
    constructor(options){
        this.$options = options
        this.$data = options.data

        //响应式  --- 劫持数据做响应式
        observe(this.$data)

        //代理方便访问数据
        proxy(this, '$data')

        //编译
        new Compil(options.el, this)
    }
}

function proxy(vm, soureceeKey) {
   Object.keys( vm[soureceeKey]).forEach(key =>{
       //把$data的属性 代理到vm上方便访问
       Object.defineProperty(vm, key, {
           get() {
               return vm[soureceeKey][key]
           },
           set(newval) {
            vm[soureceeKey][key] = newval
           }
       })
   })
}


class Observe {
    constructor(options) {
        this.value = options
        //对象数据 响应化处理
        if(typeof this.value === 'object'){
            this.walk(this.value)
        }
    }
    walk(obj) { 
        Object.keys(obj).forEach(key =>{
            defineReactive(obj, key, obj[key])
        })
    }
}
const watchers = [];

//保存更新函数 值发生变化调用更新函数
//每个响应式的可以 都要对应一个 watcher  用一次天添加一个watcher
class Watcher {
    constructor(vm, key, updateFn){
        this.vm = vm
        this.key = key,
        this.updateFn = updateFn
        // watchers.push(this)
        //dep.target 静态属性上设置为当前的watcher实例
        Dep.target = this
        this.vm[this.key] //读取来触发getter
        Dep.target = null //收集完毕质控
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}


//dep 依赖 管理某个key相关所有依赖
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

