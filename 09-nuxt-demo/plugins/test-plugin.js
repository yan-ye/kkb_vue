export default ({}, inject) => {
    inject('testPlugin', context =>{
        alert(context)
    })
}