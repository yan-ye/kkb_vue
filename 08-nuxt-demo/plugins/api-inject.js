export default (({$axios,route,store}, inject) =>{
    // console.log($axios, '>>>>>>>', route, store)
    //将来在nutx中就有了 this.$login
    inject('login', user =>{
        return $axios.$post('/api/login', user);
    })
})