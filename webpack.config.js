const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        // To include path we need a node.js package, we need absolute path:
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // copies the index.html from src folder to dist
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            // It'll look for all the files, which has the ending '.js'.
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }

};