const webpack = require('webpack')

function generateConfig (name) {
  var uglify = name.indexOf('min') > -1
  var config = {
    entry: './index.js',
    output: {
      filename: './dist/' + name + '.js',
      sourceMapFilename: './dist/' + name + '.map',
      library: 'bamboo',
      libraryTarget: 'umd'
    },
    node: {
      process: false
    },
    devtool: 'source-map'
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

  if (uglify) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    )
  }

  return config
}

module.exports = generateConfig('bamboo')
