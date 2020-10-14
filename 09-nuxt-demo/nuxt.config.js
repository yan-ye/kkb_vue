
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  //配置router
  router:{
    extendRoutes(routes, resolve){
      routes.push(
        {
          name: 'bar',
          path:'/bar',
          component: resolve(__dirname, 'pages/foo.vue')
        }
      )
    },
    // middleware:['auth']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/test-plugin',
    '@/plugins/interceptor',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://127.0.0.1:8089'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
