const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : isEnvDevelopment && 'js/[name].js',
    chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].chunk.js' : isEnvDevelopment && 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: true
  },

  devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: isEnvDevelopment ? 'style-loader' : isEnvProduction && MiniCssExtractPlugin.loader,
            // options: { injectType: "linkTag" }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // exportType: 'css-style-sheet'
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              }
            },
          }
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.svg'),
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
    }),
    isEnvProduction &&
    new MiniCssExtractPlugin({
      filename: isEnvProduction ? 'css/[name].[contenthash:8].css' : isEnvDevelopment && 'css/[name].css',
      chunkFilename: isEnvProduction ? 'css/[name].[contenthash:8].chunk.css' : isEnvDevelopment && 'css/[name].chunk.css'
    })
  ].filter(Boolean),

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