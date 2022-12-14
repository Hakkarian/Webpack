const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "src/images/[name].[ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|svg|eot|)$/i,
        type: "asset/resource",
        generator: {
          filename: "src/fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    port: 4447,
    open: true,
  },
};