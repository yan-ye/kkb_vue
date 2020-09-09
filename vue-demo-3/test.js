//为什么dep可以触发对应的dep 如下

const arr = ['t1','t2','t3']

class Tfff{
    constructor(prams){
        this.prams = prams
    }
    say(){
        console.log(this.prams)
    }
}

arr.forEach(t =>{
    const test = new Tfff(t)

    // setTimeout(() => {
    //     if(t === 't3'){
    //         test.say()
    //     } 
    // }, 1000);
    say(t, 't3', test)
   
})

function say(t,params, test) {
    setTimeout(() => {
        if(t === params){
            test.say()
        } 
    })
}


