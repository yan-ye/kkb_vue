<template>
    <div>
        <input :value="value" @input="onInput" v-bind="$attrs">
    </div>
   
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ''
            },
        },
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value)
                // 通知父级校验规则
                this.$parent.$emit('validate', e.target.value)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>