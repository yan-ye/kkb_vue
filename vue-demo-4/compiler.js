




class Compiler {
    constructor(vm, el) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        if (this.$el) {
            this.compil(this.$el)
        }
    }
    //编译视图
    compil(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                // console.log('编辑元素', node.nodeName);
                this.compilElement(node)
            } else if (this.isInter(node)) {
                // console.log('编辑差值文本', node.textContent);
                this.compilText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compil(node)
            }
        })
    }

    //判读是否为元素
    isElement(node) {
        return node.nodeType === 1
    }
    //判断是否为差值文本
    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    //判断是否为指令
    isDirective(name) {
        return name.indexOf('k-') === 0
    }

    //更新函数
    update(node,exp, dir){
        //约定更新Fn xxx
        const fn = this[dir+'Updater']
        fn && fn(node, this.$vm[exp])  //初始化视图
        new Watcher(this.$vm, exp, val =>{
            fn && fn(node, val)
        })
    }

    //更新文本
    textUpdater(node, exp){
        node.textContent = exp
    }
    //更新html
    htmlUpdater(node, exp){
        node.innerHTML = exp
    }


    //编译差值文本
    compilText(node) {
        this.update(node, RegExp.$1, 'text')
        // node.textContent = this.$vm[RegExp.$1]
    }
    //编译元素
    compilElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name
            let attrValue = attr.value
            if (this.isDirective(attrName)) {
                //规定指令格式 xxxDirective
                let dir = attrName.substring(2)
                const fn = this[dir+'Directive']
                fn && fn.call(this, node, attrValue)
                // this[dir+'Directive'] && this[dir+'Directive'](node, attrValue)
            }
        })
    }
    //text指令
    textDirective(node, exp){
        // node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }
    //html指令
    htmlDirective(node, exp){
        // node.innerHTML = this.$vm[exp]
        this.update(node, exp, 'html')
    }







}