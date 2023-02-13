const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
    cacheDirectory: true,
    cacheCompression: false,
    compact: isEnvProduction,
}