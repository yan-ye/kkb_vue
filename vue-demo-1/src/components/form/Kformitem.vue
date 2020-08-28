<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="err">{{err}}</p>   

    </div>
</template>

<script>
    export default {
        data() {
            return {
                err: '' //validate 校验错误
            }
        },
        props: {
            label: {
                type: String,
                default: '',
            },
            prop: {
                type: String,
                 default: '',
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>