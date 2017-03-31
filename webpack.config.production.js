const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin({
    filename: '[name].[hash].min.css',
    allChunks: true
});

//dir path
const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');

const config = {
    entry: {
        main: path.resolve(srcPath, 'main/index.js'),
        signIn: path.resolve(srcPath, 'signIn/index.js'),
        signUp: path.resolve(srcPath, 'signUp/index.js'),
        vendors: ['vue', 'axios', 'lodash', 'qs']
    },

    output: {
        path: distPath,
        filename: '[name].[hash].min.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: [srcPath]
            }, {
                test: /\.css$/,
                use: extractCss.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            }, {
                test: /\.scss$/,
                use: extractCss.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'sass-loader'
                        }
                    ],
                    // use style-loader in development
                    fallback: 'style-loader'
                }),
                include: [srcPath]
            }, {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ],
                include: [srcPath]
            }, {
                test: /\.(svg)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            }, {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loader: {
                                scss: extractCss.extract({
                                    use: [
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                minimize: true
                                            }
                                        }, {
                                            loader: 'sass-loader'
                                        }
                                    ],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    }
                ],
                include: [srcPath]
            }
        ]
    },

    resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js'
        }
    },

    plugins: [
        extractCss,
        new HtmlWebpackPlugin({
            title: '主界面',
            template: path.resolve(srcPath, 'main/index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['main', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            title: '登录界面',
            template: path.resolve(srcPath, 'signIn/index.html'),
            filename: 'signIn.html',
            chunks: ['signIn', 'vendors'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            title: '注册界面',
            template: path.resolve(srcPath, 'signUp/index.html'),
            filename: 'signUp.html',
            chunks: ['signUp', 'vendors'],
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: '[name].[hash].min.js'
        }),
        new UglifyJSPlugin({}),
        new webpack.BannerPlugin('Copyright HHIITT.')
    ]
};

module.exports = config;
