
const isObject = obj => obj !== null && typeof obj === 'object'

const toProxy = new WeakMap()
const toObj = new WeakMap()

function reactive(obj) {
    if (!isObject(obj)) {
        return obj
    }
    //查找缓存
    if (toProxy.has(obj)) {
        return obj
    }
    if (toObj.has(obj)) {
        return obj
    }
    const observe = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取 ${JSON.stringify(key)} ${res}`);
            //收集依赖
            track(target, key)
            return isObject(res) ? reactive(res) : res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置 ${JSON.stringify(value)} ${res}`);
            //触发依赖
            trigger(target, key)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除 ${key} ${res}`);
            //触发依赖
            trigger(target, key)
            return res
        },
    })
    //缓存
    toProxy.set(obj, observe)
    toObj.set(observe, obj)

    return observe
}

let effectStack = []
function effect(fn) {
    const rxEffect = function () {
        try {
            //入栈
            effectStack.push(rxEffect)
            return fn()
        } catch (error) {
             console.log(error, '>>>>>');
        } finally {
            //出栈
            effectStack.pop()
        }
    }
    // 默认执行一次响应函数 
    rxEffect()
    // 返回响应函数
    return rxEffect
}
let targetMap = new WeakMap()
function track(target, key) {
    //从堆栈中取出响应函数
    let effec = effectStack[effectStack.length - 1]
    if (effec) {
        //获取target对应的 map 表
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }
        //获取key 对应的响应函数表
        let deps = depsMap.get(key)
        if (!deps) {
            deps = new Set()
            depsMap.set(key, deps)
        }
        //将响应函数加入对应的集合deps
        if (!deps.has(effec)) {
            deps.add(effec)
        }
    }

}
function trigger(target, key) {
    //获取target依赖map
    let depMap = targetMap.get(target)
    if (depMap) {
        //获取key依赖的fn
        let deps = depMap.get(key)
        //执行key依赖的fn
        if (deps) {
            deps.forEach(effect => {
                effect()
            });
        }
    }
}
const obj = { foo: 'foo', bar: { foo: 'foo-bar' }, arr: [1, 2, 3, 4] }
const state = reactive(obj)
effect(() => {
    console.log('effect: ', delete state.foo);
})

// state.foo
state.foo = 'foooooo'
// state.foo
// state.bar.foo
// state.bar.foo = { test1: 'test11111' }
// state.bar.foo.test1
// state.arr[2]


// console.log(reactive(state) === state, '>>>>>>')
