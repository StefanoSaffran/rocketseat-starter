const path = require('path');
const webpack = require('webpack');

const config = {
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        query: {
          outputPath: './assets/',
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          }
        ],
      },
    ],
  },
}

module.exports = config