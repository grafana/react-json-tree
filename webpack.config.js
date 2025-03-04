import * as path from 'path';

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [],
  optimization: {
    // runtimeChunk: 'single',
  },
  experiments: {
    outputModule: true
  },
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'lib'),
    // globalObject: 'this',
    // libraryTarget: 'var',
    publicPath: '/',
    library: {
      type: "module",
    },
  },
  externals: {
    'react': 'react', // Case matters here
    'react-dom' : 'reactDOM' // Case matters here
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(js|ts)x?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['@babel/preset-env', { targets: 'defaults' }],
      //         '@babel/preset-react',
      //         '@babel/preset-typescript',
      //       ],
      //     },
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

export default config;
