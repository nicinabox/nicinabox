import querystring from 'querystring'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import parseProjects from './lib/parseProjects'

let repoData = []
try {
  repoData = require('./repos.json')
} catch(e) {
  console.log('No repo cache found.')
}

let initialData = parseProjects(repoData)

export default {
  entry: {
    index: './src/index.js',
    client: './src/client.js'
  },

  output: {
    filename: '[name].js',
    path: './build',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        presets: ['react'],
      },
      {
        test: /\.(ico|png|jpg|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?' + querystring.stringify({
          includePaths: [
            'node_modules',
            'node_modules/bootstrap-sass/assets/stylesheets'
          ]
        })),
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('main.css'),
    new StaticSiteGeneratorPlugin('index', ['/'], initialData),
  ]

}
