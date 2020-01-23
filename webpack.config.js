const { resolve } = require('path'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack')

const BUILD_DIR = resolve(__dirname, '.dist')

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
        alias: {
            src: resolve(__dirname, 'src/'),
        },
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[hash].bundle.js',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'nametbd',
            template: resolve(__dirname, 'src', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        contentBase: BUILD_DIR,
        port: 3000,
        hot: true,
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                secure: false,
            },
        },
    },
}
