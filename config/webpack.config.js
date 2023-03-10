const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isTsWatch = process.env.TS_WATCH === 'true';
const buildDev = process.env.BUILD_DEV === 'true';

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: isEnvDevelopment ? 'development' : isEnvProduction && 'production',
  stats: 'errors-warnings',
  bail: isEnvProduction,

  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index.tsx'),
    // otherChunk: path.resolve(__dirname, '..', 'src', 'filename.js'),
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : isEnvDevelopment && 'js/[name].js',
    chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].chunk.js' : isEnvDevelopment && 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: true
  },

  devtool: isEnvDevelopment && 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        options: require(path.resolve(__dirname, 'babel.config.js'))
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: (isEnvProduction || buildDev)
              ? MiniCssExtractPlugin.loader
              : isEnvDevelopment && 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset/resource'
      }
    ]
  },

  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.svg'),
      minify: isEnvProduction && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    (isEnvProduction || buildDev) &&
    new MiniCssExtractPlugin({
      filename: isEnvProduction ? 'css/[name].[contenthash:8].css' : isEnvDevelopment && 'css/[name].css',
      chunkFilename: isEnvProduction ? 'css/[name].[contenthash:8].chunk.css' : isEnvDevelopment && 'css/[name].chunk.css'
    }),
    isEnvDevelopment && isTsWatch &&
    new ForkTsCheckerWebpackPlugin({
      async: isEnvDevelopment,
      typescript: {
        configOverwrite: {
          compilerOptions: {
            sourceMap: true,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
          },
        },
        diagnosticOptions: {
          syntactic: true,
        },
        // mode: 'write-references',
      }
    })
  ].filter(Boolean),

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ]
  },

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