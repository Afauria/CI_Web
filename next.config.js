/* eslint-disable */
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypeScript = require('@zeit/next-typescript')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const path = require('path')
// fix: prevents error when .css files are required by node
// 不加这个会报错，可能是和withCss有关
// E:\CiProject\ci_web\node_modules\antd\lib\style\index.css:6
// @font-face {
// ^
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}
//因为内部webpack有自定义的sass-loader，因此外面不能再套
module.exports = withTypeScript(withCss({
  webpack(config, options) {
    const {
      dir,
      dev,
      isServer
    } = options
    //不加这个会报错，图片解析不出来，
    // ModuleParseError: Module parse failed: Unexpected character '�' (1:0) You may need an appropriate loader to handle this file type.
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[hash].[ext]',
          outputPath: 'static/img/',
          publicPath: dev ? '/_next/static/img' : (url) => {
            return './img/' + url
          },
        },
      }, ],
    })
    //scss自动生成声明文件，参考：https://www.colabug.com/2303193.html
    const cssLoader = {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        importLoaders: 1,
        camelCase: true,//加上这两个true，声明文件格式会改变
        namedExport: true,
        localIdentName: '[local]_[hash:base64:5]'
      },
    }
    const sassLoader = {
      loader: 'sass-loader'
    }
    //用于提取css
    const miniCssLoader = {
      loader: MiniCssExtractPlugin.loader
    }
    config.module.rules.push({
      test: /.scss$/,
      use: [miniCssLoader, cssLoader, sassLoader], //后面的loader先执行
      include: [path.resolve(__dirname, './src')]
    })
    //提取到一个css文件，会出问题，估计是和withCss冲突了
    // config.optimization={
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.scss$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //     },
    //   },
    // }
    //提取css
    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }))
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    // config.resolve.extensions.push('.scss')
    return config;
  }
}))