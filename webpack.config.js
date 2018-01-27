const webpack = require('webpack');
const isProd = (process.env.NODE_ENV === 'production');

// http://jonnyreeves.co.uk/2016/simple-webpack-prod-and-dev-config/
function getPlugins() {
  let plugins = [];

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_URL': JSON.stringify(process.env.NODE_API_URL),
      'LOCALE': JSON.stringify(process.env.NODE_LOCALE)
    }
  }));

  if (isProd) {
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return plugins;
}

module.exports = {
  entry: './modules/index.js',

  output: {
    path: '/code/public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
      rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ "babel-loader"]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000'],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000'],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000'],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    host: "0.0.0.0",
    hot: true,
    port: process.env.NODE_PORT
  },

  plugins: getPlugins()
};
