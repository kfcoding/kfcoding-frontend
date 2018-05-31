const BabelEnginePlugin = require('babel-engine-plugin');
const resolve = require('path').resolve;
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);

  config.plugins.push(
    new BabelEnginePlugin({
      presets: ['env']
    })
  );

  config.module.rules.push ({
    test: resolve(__dirname, 'node_modules/js-video-url-parser'),
    loader: "babel-loader",
    options: {
      babelrc: false,
      cacheDirectory: false,
      presets: ["env"],
      plugins: ["syntax-async-functions", "transform-regenerator"]
    }
  })
  config.module.rules.push ({
    test: resolve(__dirname, 'node_modules/ws'),
    loader: "babel-loader",
    options: {
      babelrc: false,
      cacheDirectory: false,
      presets: ["env"],
      plugins: ["syntax-async-functions", "transform-regenerator"]
    }
  })
  return config;
}