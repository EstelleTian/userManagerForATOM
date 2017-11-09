/*
 * @file webpack配置文件(开发环境)
 * @author liutianjiao
 * @date 2017-09-05
 */
const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 3000;

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: './app/router.jsx',
        vendor: ['react', 'react-dom', 'jquery', 'react-router', 'redux'],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.less|css$/,
                use: [
                    'style-loader',
                    'css-loader?#sourceMap',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.eot|woff|eot|ttf|svg$/,
                use: ['file-loader']
            }
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: "CDM用户管理"
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
        }),
		new OpenBrowserPlugin({
          url: `http://localhost:${port}`
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        compress: true, // 启用gzip压缩
        contentBase: path.join(__dirname, 'app'),
        port: port, // 运行端口3000
        inline: true,
        hot: true,
        historyApiFallback: true,
    },
};
