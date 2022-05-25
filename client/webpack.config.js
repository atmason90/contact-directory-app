const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // TODO: Add the correct plugins
    plugins: [
     new HtmlWebpackPlugin({
       template: './index.html',
       title: 'Contact Cards'
     }),
     new InjectManifest({
       swSrc: './src-sw.js',
       swDest: 'src-sw.js'
     }),
     new WebpackPwaManifest({
       fingerprints: false,
       inject: true,
       name: 'Contact Cards',
       short_name: 'Contacts',
       description: 'A way to manage all of your contacts',
       background_color: '#272822',
       theme_color: '#272822',
       start_url: '/',
       publicPath: '/',
       icons: [
         {
           src: path.resolve('src/images/logo.png'),
           size: [96, 128, 192, 256, 384, 512],
           destination: path.join('assets', 'icons'),
         },
       ],
     }),
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    }
  };
};
