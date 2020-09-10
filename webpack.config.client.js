const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, options) => {

return{
    mode: options.mode,
    entry: {
        app: path.resolve(__dirname, 'src', 'client', 'app.js')
    },
    output: {
        path: ( options.mode === 'production') ? 
                                            (path.resolve(__dirname, 'dist','views')) : 
                                            (path.resolve(__dirname, 'dev','views')),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js']
    },  
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname,'src','server')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname,'src','server')
                ], 
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(jpg|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: { 
                      name: 'assets/[hash].[ext]',
                      limit: 10000,
                    },
                  },
                ],
            },
            {
                test: /\.(s*)css$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname,'src','server')
                ], 
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader',
                    ],
            },   
        ]
    },
    devtool: ( options.mode === 'production') ? ('none') : ('source-map'),
    optimization: {
        minimize:  (options.mode === 'production'),
        minimizer:  (options.mode === 'production') ? ([ 
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname,'src','server')
                ],
                sourceMap: ( options.mode === 'development')
            }) 
        ]) : ([]),
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'src','client','public','index.html'),
          filename: './index.html',
          favicon: path.resolve(__dirname,'src','client','public','favicon.png')
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].css',
        }),
      ],
}}