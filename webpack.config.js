const { resolve } = require("path"),
    { CleanWebpackPlugin } = require("clean-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    webpack = require("webpack"),
    ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"),
    Dotenv = require("dotenv-webpack"),
    CopyPlugin = require("copy-webpack-plugin")

const BUILD_DIR = resolve(__dirname, ".dist")

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development"
const isDevelopment = env === "development"

// eslint-disable-next-line no-console
console.log(`FE Template: Building environment ${env}...`)

module.exports = {
    entry: "./src/index.js",
    mode: env,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: { babelrc: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        modules: [resolve(__dirname, "src"), "node_modules"],
    },
    output: {
        path: BUILD_DIR,
        publicPath: "/",
        filename: "[name]-[chunkhash].bundle.js",
    },
    plugins: [
        new webpack.ProgressPlugin(),
        isDevelopment
            ? new Dotenv()
            : new webpack.EnvironmentPlugin({
                  FIREBASE_PROJECT_ID: "dummy-firebase-project-id",
                  FIREBASE_API_KEY: "dummy-firebase-api-key",
                  LOGROCKET_CLIENT_KEY: "dummy-logrocket-client-key",
                  NODE_ENV: "development",
              }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src", "index.html"),
        }),
        isDevelopment
            ? null
            : new CopyPlugin({ patterns: [resolve(__dirname, "public")] }),
        isDevelopment
            ? new ReactRefreshWebpackPlugin({ overlay: false })
            : null,
    ].filter(Boolean),
    optimization: {
        splitChunks: {
            name: false,
            chunks: "all",
            maxSize: 10000000,
            minSize: 20000,
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            cacheGroups: {
                defaultVendors: {
                    priority: 0,
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/i,
                },
            },
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/api/**": {
                target: "http://localhost:8080",
                pathRewrite: { "^/api": "/api" },
            },
        },
    },
    devtool: "source-map",
}
