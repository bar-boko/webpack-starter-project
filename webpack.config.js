var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var debug = process.env.NODE_ENV !== 'production';

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

module.exports = {
  watch: true,
  context: srcPath,
  entry: {
    app: './index.js'
  },
  output: {
    path: distPath,
    filename: '[name]_[hash].bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [srcPath],
        loader: 'babel-loader'
      },
      {
        test: /\.html?$/,
        include: [srcPath],
        loader: 'html-loader'
      },
      {
        test: /\.less?$/,
        include: [srcPath],
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss?$/,
        include: [srcPath],
        loader: ['style-loader', 'css-loader', 'scss-loader']
      },
      {
        test: /\.less?$/,
        include: [srcPath],
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|jpeg|ttf|otf|woff|woff2|bmp|gif)?$/,
        include: [srcPath],
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true
  },
  devtool: debug ? 'source-map' : '',
  plugins: debug
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body'
        })
      ]
    : [
        new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ]
};
