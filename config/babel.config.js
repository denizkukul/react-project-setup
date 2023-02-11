const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
    presets: [
        "@babel/preset-env"
    ],
    cacheDirectory: true,
    cacheCompression: false,
    compact: isEnvProduction,
}