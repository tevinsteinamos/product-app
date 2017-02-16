/*eslint-env node */
var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  {
    test: /\.css$/,
    exclude: /\.global\.css$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    ],
  },
  {test: /\.global\.css$/, loader: 'style!raw'},
  {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&' +
      'includePaths[]=' +
      (encodeURIComponent(path.resolve('./node_modules'))),
  },
];

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
  module: {loaders: loaders},
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [
            './node_modules',
            './node_modules/grommet/node_modules',
          ],
        },
      },
    }),
  ],
};
