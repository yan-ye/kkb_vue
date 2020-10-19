# 12-vue-test-generics

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 类型  原始类型  或 对象类型   不是原始类型的都是对象类型

### 类型断言  ！ as

### 联合类型  |

### 交叉类型 &

### 函数 参数一旦声明就要求传递     可选参数放在后面

### 函数重载 就是以参数个数或类型区分的多个同名函数

### 类  private   protected  public 访问权的控制

### 接口  interface    别名 type

### 泛型   <T>   interface Resulet<T> {ok: 1 | 2, data T}   function getRsult<T>(data:T):Resulet<T>{ return {ok：1, data}}      getRsult<string>('hi')

### 声明文件  .d.ts 命名的文件

### 装饰器  类装饰器 一个参数 targe 实例 、 方法装饰器 三个参数  target 实例  name 方法名  descriptor  
