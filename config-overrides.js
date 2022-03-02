const webpack = require('webpack');
const nodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config, env) {

    config.resolve.fallback = {
        // url: require.resolve('url'),
        // assert: require.resolve('assert'),
        // crypto: require.resolve('crypto-browserify'),
        // http: require.resolve('stream-http'),
        // https: require.resolve('https-browserify'),
        // os: require.resolve('os-browserify/browser'),
        // buffer: require.resolve('buffer'),
        // stream: require.resolve('stream-browserify'),
        // path: require.resolve('path-browserify'),
        // zlib: require.resolve('browserify-zlib'),

        "fs": false,
        "dgram": false,
        "net": require.resolve('net-browserify'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new nodePolyfillPlugin()
    );
    

    return config;
}