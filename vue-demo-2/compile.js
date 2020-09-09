
class Compil {
    constructor(el,vm){
        this.$vm = vm
        this.$el = document.querySelector(el)
        if(this.$el){
            this.compil(this.$el)
        }
    }
    compil(el){
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node =>{
            if(this.isElement(node)){
                // console.log('编译元素', node.nodeName);
                this.compilElement(node)
            }else if(this.inTer(node)){
                // console.log('编译差值', node.textContent);
                this.compilText(node)
            }
            //递归
            if(node.childNodes && node.childNodes.length > 0) {
                this.compil(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }


    inTer(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }


    compilText(node) {
        this.update(node, RegExp.$1, 'text')
    }

    text(node, value){
        this.update(node, value, 'text')
    }


    compilElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr =>{
            let [attrName, attrValue] = [attr.name, attr.value]
            if(this.isDirective(attrName)){
                let dir = attrName.substring(2);
                this[dir] && this[dir](node, attrValue)
            }
        })
    }

    isDirective(attr) {
        return attr.indexOf('k-') == 0
    }


    update(node, exp, dir){
          //初始化
        //指令对应的更新函数 xxUpdater
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        //更新     更新一个函数  可以更新对应的DOM元素
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }


    textUpdater(node, value) {
        node.textContent = value
    }

}
