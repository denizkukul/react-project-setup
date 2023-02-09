const isEnvDevelopment = process.env.mode === 'development';
const isEnvProduction = process.env.mode === 'production';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: isEnvDevelopment ? 'development' : isEnvProduction && 'production',
  stats: 'errors-warnings',
  bail: isEnvProduction,

  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index.js'),
    // otherChunk: path.resolve(__dirname, '..', 'src', 'filename.js'),
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name][contenthash].js',
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : isEnvDevelopment && 'js/bundle.js',
    chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].chunk.js' : isEnvDevelopment && 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: true
  },

  devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    })
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  }
};