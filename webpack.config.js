/*
 * @file webpack配置文件(开发环境)
 * @author liutianjiao
 * @date 2017-09-05
 */
const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 3000;

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: './app/router.jsx',
        vendor: ['react', 'react-dom', 'jquery', 'react-router', 'redux'],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].[hash:5].js',
        chunkFilename: "js/[name].chunk.js" //给每个分片产生一个文件
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
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
		new OpenBrowserPlugin({
          url: `http://localhost:${port}`
        }),
        new HtmlWebpackPlugin({
            title: 'ATMM用户管理',
            // filename:'index.html',    //生成的html存放路径，相对于 path
            // template:'./app/index.html',    //html模板路径
            // inject:true,    //允许插件修改哪些内容，包括head与body
            // hash:true,    //为静态资源生成hash值
            // minify:{    //压缩HTML文件
            //     removeComments:true,    //移除HTML中的注释
            //     collapseWhitespace:false    //删除空白符与换行符
            // }
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
