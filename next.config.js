// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTypescript = require('@zeit/next-typescript');

const { parsed: localEnv } = require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withCSS = require('@zeit/next-css');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      return config;
    },
  }),
);
