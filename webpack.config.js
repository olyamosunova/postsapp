const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

const config = {
    mode: isProd ? "production" : "development",
    entry: {
        index: "./src/index.tsx",
    },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/',
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            // Process any .js or .jsx file with Babel
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
        }),
    ],
};

if (isProd) {
    config.optimization = {
        minimizer: [new TerserWebpackPlugin()],
    };
} else {
    config.devServer = {
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        stats: "errors-only",
        overlay: true,
        historyApiFallback: true,
    };
}

module.exports = config;
