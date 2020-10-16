

//类型注解！
let var1:string
var1 = 'hellow 类型注解string'

let var2: number
var2 = 123

// 常见的原始类型 有 string  number boolean null undefind symbol

//类型数组
let arr:string[]
// arr = [122]   //错误的
   arr = ['123'] //正确的

//任意类型 any
let varAny: any[]
varAny = [1,'1',false]

//函数中的类型约束  约束返回值   约束参数

function greet(p:string):string {
    return p + 'hi'
}
//void类型的 常用于没有返回的函数
function varn():void{}

// ====  对象类型   不是原始类型就是对象类型
function fn(o:Object) { }// 这样约等于js 没有意义 

//更好的约束方式应该是这样

function fn1(prop:number) {}
   fn1(1)     //ok
// fn1('hi') //error

//类型别名  自定义类型
type prop = {o:number}

function fn3(prop:prop) {}

fn3({o: 1})

//类型断言
let varStr:any = 'this is a string'
const strLength = (varStr as string).length

//联合类型
let union: string | number | boolean
union = 1
union ='1'
union = false
// union = null   error 

//交叉类型
type f1 = {f1: number}
type f2 = {f2: string}
type f3 = f1 & f2
function fn4(params:f3):f3 {
    return {f1:1, f2:'hi'}
}
fn4({f1:1, f2:'hi'})

// ======= 函数 ======
// 参数        一旦声明 就要要求传递 并且类型需要符合要求
// 可选参数    在参数后面加问号   可选参数需要在后面声明
// 默认值

function greeting(name:string, wh:string = '中国' ,age?:number) {
    
}
greeting('yanye')







