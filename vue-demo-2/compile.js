
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
        node.textContent = this.$vm[RegExp.$1]
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
    text(node, value){
        node.textContent = this.$vm[value]
    }

}
