'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["./src/pages/home/client.js"],
  output: {
    path: __dirname,
    filename: "static/bundle.js"
  },
  resolve: {
    extensions: ['.js', '.marko'],
  },
  module: {
    loaders: [{

        test: /\.marko$/,
        loader: 'marko-loader'
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'file',
        query: {
          name: 'static/images/[hash].[ext]',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    // Write out CSS bundle to its own file:
    new ExtractTextPlugin({ allChunks: true, filename: 'static/bundle.css' })
  ]
};