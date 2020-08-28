<template>
    <div>
        <input type="text" :value="value" @input="onInput">
        <div> {{value}}</div>
    </div>
   
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
        },
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>