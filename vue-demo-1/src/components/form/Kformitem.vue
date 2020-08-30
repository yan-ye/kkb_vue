<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="err">{{err}}</p>   
    </div>
</template>

<script>
    import Schema from 'async-validator'
    export default {
        inject: ['form'],
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
            },
        },
        mounted () {
            this.$on('validate', () =>{
                //执行校验
               this.validate()
            });
        },
        methods: {
            //校验方法
            validate() {
                //g规则
                const rules = this.form.rules[this.prop]
                //当前值
                const value = this.form.model[this.prop]
                //校验的描述对象
                const desc = {[this.prop]: rules}
                //创建Schema实例
                const schema = new Schema(desc);
                return schema.validate({[this.prop]: value}, error =>{
                    if(error) {
                        this.err = error[0].message
                    }else {
                        //校验通过
                        this.err = '';
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>