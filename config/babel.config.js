const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
    presets: [
        ["@babel/preset-env", { targets: 'chrome 108' }],
        "@babel/preset-typescript"
    ],
    cacheDirectory: true,
    cacheCompression: false,
    compact: isEnvProduction,
}