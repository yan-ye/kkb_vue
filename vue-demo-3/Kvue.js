


//数据劫持 做响应化处理
function defineReactive(obj, key, val) {
    //递归一下值 ---> val
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key, val);
            return val
        },
        set(newVal) {
            //递归一下新设置的值 ---> newVal
            observe(val)
            val = newVal
            console.log('set', key, newVal);
            watchers.forEach(watcher =>{
                watcher.update()
            })
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

const watchers = []; //临时保存watcher
//监听器：负责更新视图
//每个响应化的key对应一个watcher
class Watcher{
    constructor(vm, key, updateFn){
        //Kvue实例
        this.vm = vm,
        //key
        this.key = key,
        //更新函数
        this.updateFn = updateFn
        watchers.push(this)
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}