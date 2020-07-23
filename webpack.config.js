const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        // To include path we need a node.js package, we need absolute path:
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    mode: 'development'

};