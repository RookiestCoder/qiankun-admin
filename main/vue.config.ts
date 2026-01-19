import path from 'path'

export default {
  devServer: {
    port: 5500,
  },
  chainWebpack: config => {
    config.plugin('html').tap((args) => {
      args[0].title = 'qiankun-test';
      return args;
    });

    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@qiankun-admin/shared', path.resolve(__dirname, '../packages/shared/src'))
      .set('@qiankun-admin/theme', path.resolve(__dirname, '../packages/theme/src'))
      .set('@qiankun-admin/ui', path.resolve(__dirname, '../packages/ui/src'));
  },
};
