const path = require('path');
const html = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { url: false } },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'images/[name]-[hash:6][ext]',
      //   },
      // },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/i,
      //   type: 'asset/inline',
      // },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name]-[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash:6][ext]',
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new html({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 30000, // 端口号
    open: true,
  },
  mode: 'development',
};
