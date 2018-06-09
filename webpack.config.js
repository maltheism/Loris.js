'use strict';

const path = require('path');
const externals = require('webpack-node-externals')

module.exports = {
    entry: './bin/www.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'loris-webpack.bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    externals: [externals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [

    ],
    mode: 'none',
    target: 'node'
};