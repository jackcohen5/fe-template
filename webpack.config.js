const { resolve } = require('path'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const BUILD_DIR = resolve(__dirname, '.dist')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const isDevelopment = env === 'development'

module.exports = {
    entry: './src/index.js',
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            resolve(__dirname, 'src'),
            resolve(__dirname, 'node_modules'),
        ],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[chunkhash].bundle.js',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'FE Template',
            template: resolve(__dirname, 'src', 'index.html'),
        }),
        isDevelopment ? new webpack.HotModuleReplacementPlugin() : null,
        isDevelopment ? new ReactRefreshWebpackPlugin() : null,
    ].filter(Boolean),
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        contentBase: BUILD_DIR,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8080/development',
                pathRewrite: { '^/api': '/api' },
            },
        },
    },
}
