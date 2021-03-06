const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom','mobx' ,'react-dom', 'mobx-react']//分离第三方库,可自定义增加
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif|ico|jpeg|bmp)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader',
                {loader:'less-loader', options: {
                    modifyVars: {
                        //http://ip/iconfont
                        // '@icon-url': '"/fonts/iconfont/iconfont"',
                        // "@primary-color": "#7bceda"
                    }
                }}
            ]
        }, {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader', options: { sourceMap: true }},
                { loader: 'css-loader', options: { sourceMap: true}},
                { loader: 'postcss-loader', options: { sourceMap: true }},
                { loader: 'sass-loader', options: { sourceMap: true }}
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: 'src/assets/favicon.ico',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],


    resolve: {
        alias: {
            '@' :  path.join(__dirname, 'src'),
            'assets': path.join(__dirname, 'src/assets'),
            'pages': path.join(__dirname, 'src/pages'),
            'components': path.join(__dirname, 'src/components'),
            'router': path.join(__dirname, 'src/router'),
            'stores': path.join(__dirname, 'src/stores')
        },
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: [".js", ".jsx"]
    },
};

module.exports = commonConfig;