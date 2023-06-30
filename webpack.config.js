const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

const extensions = [".js", ".jsx"];

module.exports = {
  mode:  "development",
  entry: "./src/index.js",
//added for dev server
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
  },
  resolve: { extensions },
  devServer: {
    port: 3000,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: false,
      // historyApiFallback: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({ extensions }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/lg.png",
    }),
  ],
  stats: "minimal",
};
