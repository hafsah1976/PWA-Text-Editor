const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Set the build mode to development for now, change to 'production' for production builds.
    mode: 'development',
    
    // Define entry points for your application.
    entry: {
      main: './src/js/index.js',     // Main application entry point
      install: './src/js/install.js' // Entry point for installation-related code
    },
    
    // Configure the output directory and filename for bundled JavaScript files.
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    
    // Define plugins to enhance Webpack's functionality.
    plugins: [
      // HtmlWebpackPlugin configuration to generate HTML files.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
      
      // InjectManifest configuration for service worker integration.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      // WebpackPwaManifest configuration to generate a manifest file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'maskable',         
          },
        ],
      }),
      
    ],

    // Define rules for processing different types of files (e.g., CSS, Babel for JavaScript).
    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
