import baseConfig from '.';
import merge from 'webpack-merge';
import {
  configs,
  inputs,
  outputs,
  loaders,
  plugins,
  externals
} from '@feizheng/webpack-lib-kits';

export default merge(baseConfig, {
  entry: inputs.build(),
  output: outputs.build({
    library: 'ReactAntDropdownMenu'
  }),
  externals: externals.base({
    '@feizheng/noop': '@feizheng/noop',
    '@feizheng/next-js-core2': '@feizheng/next-js-core2',
    '@feizheng/next-traverse': '@feizheng/next-traverse',
    '@feizheng/react-ant-menu': '@feizheng/react-ant-menu',
    antd: 'antd'
  }),
  plugins: [plugins.clean(), plugins.copyStyles()]
});
