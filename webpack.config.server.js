const path = require('path');
const  nodeExternals = require('webpack-node-externals');
const  NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = ( _, options ) => {
return { 
  mode: options.mode,
  target: 'node',
  entry: {
    server : path.resolve(__dirname, 'src','server','index.js')
  },
  output: {
    filename: '[name].js',
    path: ( options.mode === 'production') ? 
                              (path.resolve(__dirname, 'dist')) : 
                              (path.resolve(__dirname, 'dev')),
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: ( options.mode === 'production') ? ('none') : 'inline-source-map',
  resolve: {
    extensions: ['.js']
  },  
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: {
            loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: {
            loader: 'css-loader'
        }
      }
    ]
  },
  optimization: {
    minimize: ( options.mode === 'production'),
    minimizer: ( options.mode === 'production') ? ([ 
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /node_modules/
        }) 
    ]) : [],
  },
  plugins: ( options.mode === 'development' ) ? 
  [
      new Dotenv(),
      new NodemonPlugin(),
  ]
  :
  []
}
};