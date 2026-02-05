const { name } = require('./package.json');
module.exports = {
  publicPath: '/',
  devServer: {
    hot: true,
    // disableHostCheck: true,
    // host: process.env.VUE_APP_HOST,
    // port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
    headers: {
      'Access-Control-Allow-Origin': '*', //需要支持跨域
    },
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd', //把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`, //// webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
    resolve: {
      // 确保优先使用 CommonJS 格式
      mainFields: ['main', 'module'],
    },
  },
  chainWebpack: config => {
    // 配置 vue-loader，将所有以 qk- 开头的标签视为自定义元素（Web Components）
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // 将所有以 qk- 开头的标签都视为自定义元素
          isCustomElement: tag => tag.startsWith('qk-'),
        },
      }));
    // config.resolve.symlinks(false); // 关闭热更新时的符号链接
  },
};
