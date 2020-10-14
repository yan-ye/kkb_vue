export default ({ $axios, store }, inject) => {
    $axios.onRequest( config =>{
        if(store.state.user.token) {
            config.headers.Authorization = "Bearer " + store.state.user.token;
            console.log('BearerBearerBearerBearerBearerBearerBearer')
        }
        return config
    })
}