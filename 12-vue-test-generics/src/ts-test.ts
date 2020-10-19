
//泛型  ---- 泛型 ---- 基本用法
interface Feature<T> {
    name: string,
    id: number,
    data: T
}

function getF<T>(data:T): Feature<T> {
    return {name:'x',id:1, data}
}

console.log(getF<string>('hello Generics ...'))
