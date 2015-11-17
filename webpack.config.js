module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },

  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      {
	test: /\.js$/,
	exclude: /node_modules/,
	loaders: ['react-hot', 'babel-loader']
      },
      {
	test: /\.html$/,
	loader: 'file?name=[name].[ext]'
      }
    ]
  },

  devServer: {
    port: 9000,
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        { from: /\/explorer/, to: '/index.html' }
      ]
    }
  }
}
