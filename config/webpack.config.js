const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index.js'),
    // index2: path.resolve(__dirname, '..', 'src', 'index2.js')
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    // filename: '[name][contenthash].js',
    pathinfo: true,
    clean: true
  },
  devtool: 'cheap-module-source-map',
  // optimization: {
  //   minimize: false,
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src', 'index.html')
    })
  ]
};