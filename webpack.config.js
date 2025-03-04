import * as path from 'path';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'development',

  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
