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
    }
  }
}