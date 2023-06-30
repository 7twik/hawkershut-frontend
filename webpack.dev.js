// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const EslintWebpackPlugin = require("eslint-webpack-plugin");

// const extensions = [".js", ".jsx"];

// module.exports = {
//   mode:  "development",
//   entry: "./src/index.js",
// //added for dev server

//   devServer: {
//     port: 3000,
//     contentBase: path.join(__dirname, 'dist'),
//     hot: false,
//     liveReload: true,
//   },

//   output: {
//     path: path.resolve(__dirname, "build"),
//   },
//   resolve: { extensions },
//   devServer: {
//     client: {
//       overlay: false,
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/i,
//         use: [
//           {
//             loader: "babel-loader",
//             options: {
//               presets: [["@babel/preset-react", { runtime: "automatic" }]],
//             },
//           },
//         ],
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new EslintWebpackPlugin({ extensions }),
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       favicon: "./public/lg.png",
//     }),
//   ],
//   stats: "minimal",
// };
const {merge} = require('webpack-merge');
  const commonConfig = require('./webpack.common');

  const devConfig = {
    mode: 'development',
  }

  module.exports = merge(commonConfig, devConfig);
