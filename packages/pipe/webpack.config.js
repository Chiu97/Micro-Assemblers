const path = require('path')
const projs_config = require('./package.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BUILDEMODE } = process.env

const WEBPACK_CONFIG = env => {
    return {
        entry: './src/index.ts',
        mode: BUILDEMODE||'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name]${projs_config.version}.js`
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    use: ["babel-loader", "ts-loader"]
                },
                // {
                //     test: /\.js[x]?$/,
                //     use: ["babel-loader"]
                // }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            new CleanWebpackPlugin()
        ],
    }
}
    

module.exports = WEBPACK_CONFIG