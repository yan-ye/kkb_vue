<template>
    <div>
        <children1></children1>
        <children2></children2>
    </div>
</template>

<script>
    import children1 from './children1.vue'
    import children2 from './children2.vue'
    export default {
        components: {
            children1,
            children2
        },
        
    }
</script>

<style lang="scss" scoped>

</style>