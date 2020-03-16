const path = require('path')
const uglifyJs = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        testSecond: './src/testSecond.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new uglifyJs(),
        new webpack.ProvidePlugin({
            $: 'jquery', // 这是通过npm安装的jq的引入方式，如果是文件则直接用路径地址
            jQuery: 'jquery'
        })
    ]
}