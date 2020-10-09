<template>
    <div @click="onClick">
        {{msg}}
        {{$attrs.foo}}
        <slot></slot>
        <slot name="test"></slot>
        <slot :foo1=foo1></slot>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            msg: {
                type: String,
                default:'' 
            },
            foo1:{
                type: String,
                default:'好好学习 天天向上'
            }
        },
          methods:{
           onClick() {
             this.$emit('logMsg', 'chilren111111','fff111','222222')
             this.$bus.$emit('foo', '来自孩子1的问候...')
             this.$parent.$emit('parent','来自兄弟1的问候')
           },
           eat() {
               console.log('这就回家....')
           }
       }
        
    }
</script>

<style lang="scss" scoped>

</style>