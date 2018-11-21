const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    questionnaire: './questionnaire.jsx',
    admin: './admin.jsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/www/scripts'
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
