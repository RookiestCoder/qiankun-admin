const path = require('path');

module.exports = {
  devServer: {
    port: 5500,
  },
  chainWebpack: config => {
    config.plugin('html').tap((args) => {
      args[0].title = 'qiankun-test';
      return args;
    });

    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'));
  },
};
