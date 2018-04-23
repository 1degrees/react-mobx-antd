const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const commonConfig = require('./webpack.base.config.js');
const devUrl = 'http://localhost:3001/login'
const GLOBALS = {
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_URL: JSON.stringify('http://user-api.wanshifu.com/'),
    }
  };
  
const devConfig = {
    //devtool: 'inline-source-map',//加了导致热更新很慢.,未知原因
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但[chunkhash]和react-hot-loader不兼容。*/
        filename: '[name].[hash].js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3001,
        compress: true,
        historyApiFallback: true, 
        host: "0.0.0.0",
        proxy: {},
    },
    plugins: [
		new OpenBrowserPlugin({ url: devUrl }),
        new webpack.DefinePlugin(GLOBALS)
	]
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);