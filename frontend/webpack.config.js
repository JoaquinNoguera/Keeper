const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname,'src/client/app.js'),
    output: {
        path: path.resolve(__dirname, 'src/server/static'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                loader: 'babel-loader'
            },
            {
                test: /.s[ac]ss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }, devtool: 'source-map',
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'src/server/static'),
        port: 3001,
        host: '0.0.0.0',
        proxy:{
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }   
}