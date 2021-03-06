var webpack = require('webpack');

module.exports = {
  entry: [
    './app/app.jsx'
  ],
  output: {
    path: __dirname,
    filename: '/public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      applicationStyles: 'app/styles/app.scss',
      Navigation: 'app/components/Navigation.jsx',
      Login: 'app/components/Login.jsx',
      MetricsHome: 'app/components/MetricsHome.jsx',
      ThingsHome: 'app/components/ThingsHome.jsx',
      MetricsTable: 'app/components/MetricsTable.jsx',
      ThingsTable:'app/components/ThingsTable.jsx'
    },
    extensions: ['','.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
