const BabelEnginePlugin = require('babel-engine-plugin');
const resolve = require('path').resolve;
const { injectBabelPlugin } = require('react-app-rewired');
const rewirePreact = require('react-app-rewire-preact');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);

  //config = rewirePreact(config, env);
  config.plugins.push(
    new BabelEnginePlugin({
      presets: ['env', 'react']
    })
  );

  // config.module.rules.push ({
  //   test: resolve(__dirname, 'node_modules/js-video-url-parser'),
  //   loader: "babel-loader",
  //   options: {
  //     babelrc: false,
  //     cacheDirectory: false,
  //     presets: ["env"],
  //     plugins: ["syntax-async-functions", "transform-regenerator"]
  //   }
  // })
  // config.module.rules.push ({
  //   test: resolve(__dirname, 'node_modules/ws'),
  //   loader: "babel-loader",
  //   options: {
  //     babelrc: false,
  //     cacheDirectory: false,
  //     presets: ["env"],
  //     plugins: ["syntax-async-functions", "transform-regenerator"]
  //   }
  // })
  return config;
}