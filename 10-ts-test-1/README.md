##环境搭建

#### 安装typescript并初始化配置
    ```
    npm i typescript -g
    tsc --init
    npm init -y

    ```
#### 工程化
- webpack, webpack-cli, webpack-dev-server
    ```
    npm i webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin -D

    ```
配置文件：webpack.config.js
    ```
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
        entry: './src/index.ts',
        output: {
            filename: 'app.js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx']
        },
        devtool: 'cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    use: [{
                        loader: 'ts-loader'
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ]
    }

    ```


#### 添加开发脚本

    ```
    "scripts": {
        "dev": "webpack-dev-server --config ./build/webpack.config.js"
    }

    ```

#### 各种版本不兼容 这是最后的兼容版本
```
  devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "ts-loader": "^8.0.5",
    "typescript": "^4.0.3",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.10.3"
  }
```    