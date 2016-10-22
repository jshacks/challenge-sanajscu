var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // the main entry of our app
  entry: {
    main: 'src/main.js',
  },
  // output configuration
  output: {
    path: path.resolve(__dirname, './public/build/'),
    publicPath: './build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude:[/node_modules/, /styles/] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader!') },
      { test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader'},
      { test:/\.(png|jpe?g|gif)$/,exclude:/node_modules/,loader: 'url-loader?limit=8192'}
    ],
    noParse: /dist\/ol.js/,
  },
  resolve: {
    root: path.resolve(__dirname, '/resources/assets/'),
    moduleDirectories: path.resolve(__dirname, '/node_modules/'),
    extensions: ['', '.js', '.vue', '.scss'],
    alias: {
      vue: 'vue/dist/vue.js',
      'styles': path.resolve(__dirname, './resources/assets/sass'),
      'src': path.resolve(__dirname, './resources/assets/js'),
      'filters': path.resolve(__dirname, './resources/js/js/filters'),
      'directives': path.resolve(__dirname, './resources/assets/js/directives'),
      'components': path.resolve(__dirname, './resources/assets/js/components'),
    },
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
    }),
    new ManifestPlugin({
      fileName: 'rev-manifest.json'
    }),
  ]
}

