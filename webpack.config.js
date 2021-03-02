const path = require('path');
const bundleCutoff = 50000;

module.exports = {
    entry: [
        './assets/src/js/app.js',
        './assets/src/scss/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, './assets/dist/'),
        filename: 'app.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "./assets/src/scss")
                ],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: './', name: '[name].min.css'}
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "./assets/src/js/src/react")
                ],
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: bundleCutoff,
                        name: "[name]-[hash].[ext]"
                    }
                }
            },
            {
                test: /\.(jpg|png|svg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: bundleCutoff,
                        name: "[name]-[hash].[ext]"
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules')
        ]
    },
    devServer: {
        contentBase: './',
        disableHostCheck: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        hot: true,
        index: 'index.html',
        port: 8088
    }
};
