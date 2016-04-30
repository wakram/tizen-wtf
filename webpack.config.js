var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    "react-hot-loader/patch",
    "babel-polyfill",
    "./js/app.js"
  ],
   output: {
       path: __dirname,
       filename: "app.bundle.js"
   },
   plugins: [
     new webpack.HotModuleReplacementPlugin()
   ],
   module: {
       loaders: [{
             test: /\.css$/,
             loader: "style!css"
           }, {
             test: /\.js$/,
             exclude: /node_modules/,
             loaders: ['babel']
           }
       ]
   }
}
