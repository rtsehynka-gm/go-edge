/** eslint-disable */
const path = require('path');

module.exports = {
  entry: './scripts/widgets.js', // Path to your entry file
  output: {
    path: path.resolve(__dirname, 'scripts/dist'),
    filename: 'widgets.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
