const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'boundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader',
                    ],
            },   
        ]
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'build'),
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/bloc.png'
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].css',
        }),
      ],
}