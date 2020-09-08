


//拦截数据 做响应式数据
function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key, val);
            return val
        },
        set (newval){
            observe(newval)
            val = newval
            console.log('set', key, newval);
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
    }
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



