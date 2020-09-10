

//数据劫持
function defineReactive(obj, key , val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key, val);
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal){
            observe(newVal)
            val = newVal
            console.log('set',key, newVal);
            dep.notice()
        }
    })
    
}
let obj1 ={name:1,age:2,say:3}
// defineReactive(obj,'say', obj.say)
// obj.say
// obj.say = 2222

function observe(obj) {
    if(typeof obj !== 'object'){
        return
    }
    new Observe(obj)
}

//代理方便访问数据
function proxy(vm, soureceKey) {
    Object.keys(vm[soureceKey]).forEach(key =>{
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
    constructor(options){
        this.$options = options
        this.$data = options.data
        //代理
        proxy(this, '$data')
        //数据劫持响应化
        observe(this.$data)
        //编译
        new Compiler(this, options.el)
    }
}

class Observe{
    constructor(data){
        this.$data = data
        
        //对象的处理方式
        if(typeof this.$data  === 'object'){
            this.walk(this.$data)
        }
    }
    walk(obj){
        Object.keys(obj).forEach(key =>{
            defineReactive(obj, key, obj[key])
        }) 
    }

}



class Watcher {
    constructor(vm, key, updateFn){
        //kvue
        this.vm = vm
        //key
        this.key = key
        //更新函数
        this.updateFn = updateFn
       
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    update(){
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}


class Dep {
    constructor() {
        this.deps = []
    }
    addDep (dep){
        this.deps.push(dep)
    }
    notice() {
        this.deps.forEach(dep =>{
            dep.update()
        })
    }
}