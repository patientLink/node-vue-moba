const {SkeletonPlugin} = require('page-skeleton-webpack-plugin')
const path = require('path')

module.exports = {

  outputDir: __dirname + '/../server/web',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/web/'
  : '/' ,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        // 'common': '@/common',
        'components': '@/components',
        // 'network': '@/network',
        'views': '@/views',
        'router': '@/router'
      }
    },
    plugins: [
      new SkeletonPlugin({
        pathname: path.resolve(__dirname, '/../server/shell'),
        staticDir: path.resolve(__dirname, '/../server/web'),
        routes: ['/']
      })
    ]
  },
  chainWebpack: (config) => {
    if(process.env.NODE_ENV !== 'development') {
      config.plugin('html').tap(opts => {
        opts[0].minify.removeComments = false
        return opts
      })
    }
  }
}