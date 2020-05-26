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