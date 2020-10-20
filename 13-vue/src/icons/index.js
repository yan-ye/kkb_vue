import Vue from 'vue'
import svgIcon from '@/components/svgIcon.vue'

// webpack创建  以 ./svg 目录  搜索子目录=false  的符合/\.svg$/ 的文件
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

Vue.component('svg-icon', svgIcon)