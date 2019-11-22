const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '##1787EB',
          'link-color': '##1787EB',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/styles/theme.less')]
    }
  }
}
