import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "eval-source-map",
  plugins: [
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default config;
