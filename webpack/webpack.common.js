const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const browser = 'chrome';
const BUILD_DIR_NAME = 'dist';
const SRC_DIR_NAME = 'src';

module.exports = {
  entry: {
    popup: path.join(__dirname, `../${SRC_DIR_NAME}/popup.ts`)
  },
  output: {
    path: path.join(__dirname, `../${BUILD_DIR_NAME}`),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback:{   
      "child_process":false,
      "util":false,
      "path":false,
      "os":false,
      "fs":false 
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './lib/my_script.py',to: `../${BUILD_DIR_NAME}`, context:'src'},
        { from: './images', to: `../${BUILD_DIR_NAME}/images`, context: 'public' },
        { from: './popup.html', to: `../${BUILD_DIR_NAME}/popup.html`, context: 'public' },
        { from: './content-script.js', to: `../${BUILD_DIR_NAME}/content-script.js`, context: 'public' },
        { from: `${browser}-manifest.json`, to: `../${BUILD_DIR_NAME}/manifest.json`, context: 'public' },
      ],
    }),
  ],
};
