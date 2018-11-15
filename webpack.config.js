const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    index: './index.jsx'
  },
  output: {
    path: path.resolve(__dirname, './www'),
    filename: 'questionnaire.js',
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  module: {
    rules: [
      // jsx
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      // styles
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      // images
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
      },
    ]
  },
};
