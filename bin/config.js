import { resolveRoot } from './lib/util';

export default {
  gitRepoTemplate: {
    python: 'https://github.com/pashangshangpo/htmlpy.git#main',
  },
  devServer: {
    contentBase: resolveRoot('dist'),
    compress: true,
    hot: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    writeToDisk: true,
    stats: 'errors-only',
    headers: {
      Server: 'webpack-dev-server',
    },
  },
};
