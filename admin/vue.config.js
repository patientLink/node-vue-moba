module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/admin/'
  : '/',
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