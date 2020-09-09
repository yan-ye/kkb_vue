

class Compiler {
    constructor(el, vm) {
        this.$el = document.querySelector(el),
            this.$vm = vm
        if (this.$el) {
            this.compil(this.$el)
        }
    }
    compil(el) {
        //子节点的集合
        const childNodes = el.childNodes;
        //遍历子节点的集合
        /*
        <div>
        <p>123</p>
        </div>
        */
        //p元素是p元素 123是123   循环得到p标签   再循环p得到里面的123
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                //编译元素
                this.compilElement(node)
            } else if (this.isInter(node)) {
                //编辑差值文本
                this.compilInter(node)
            }
            //!!!!!!!!!!!!!!!  递归遍历元素的子节点 直至所有元素都没有了childNodes为止 !!!!!!!!!!!!!!!
            if (node.childNodes && node.childNodes.length > 0) {
                this.compil(node);
            }
        })
    }
    //判断是否为元素Fn
    isElement(node) {
        return node.nodeType === 1;
    }
    //判断是否为差值Fn
    isInter(node) {
        ///\{\{(.*)\}\}/.test(node.textContent) 分组然后使用R RegExp.$1 获取里面的内容
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }


    //编译文本
    compilInter(node) {
        // node.textContent = this.$vm[RegExp.$1]
        this.updateReactiveData(node, RegExp.$1, 'text')
    }
    //编译元素
    compilElement(node) {
        //获取属性
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name
            let attrValue = attr.value
            //判断是否为指令
            if (this.isDirective(attrName)) {
                //约定指令 xxDirective
                const dir = attrName.substring(2)
                this[dir + 'Directive'] && this[dir + 'Directive'](node, attrValue)
            }
        })
    }


    //绑定text指令
    textDirective(node, value) {
        // node.textContent = this.$vm[value]
        this.updateReactiveData(node, value, 'text')
    }
    //绑定html指令
    htmlDirective(node, value) {
        // node.innerHTML = value
        this.updateReactiveData(node, value, 'html')
    }

    //判断是否为指令的Fn
    isDirective(attr) {
        return attr.indexOf('k-') === 0
    }

    //更新响应化数据的Fn
    updateReactiveData(node, exp, dir) {
        //约定更新方法 xxxUpdater
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp]) //初始化视图
        new Watcher(this.$vm, exp, function (val) { //更新视图
            fn && fn(node, val)
        })
    }
    //更新text的Fn
    textUpdater(node, exp) {
        node.textContent = exp
    }
     //更新html的Fn
    htmlUpdater(node, value) {
        node.innerHTML = value
    }

}