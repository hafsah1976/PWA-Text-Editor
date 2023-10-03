const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate HTML files
const WebpackPwaManifest = require("webpack-pwa-manifest"); // Plugin to generate a PWA manifest file
const path = require("path"); // Node.js path module for working with file paths

// Import the 'InjectManifest' plugin from 'workbox-webpack-plugin'
const { InjectManifest } = require("workbox-webpack-plugin");

// Import the 'MiniCssExtractPlugin' for extracting CSS into separate files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    // Set the build mode to development for now, change to 'production' for production builds.
    mode: "development",

    // Define entry points for your application.
    entry: {
      main: "./src/js/index.js", // Main application entry point
      install: "./src/js/install.js", // Entry point for installation-related code
    },

    // Configure the output directory and filename for bundled JavaScript files.
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"), // Output directory
    },

    // Define plugins to enhance Webpack's functionality.
    plugins: [
      // HtmlWebpackPlugin configuration to generate HTML files.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just Another Text Editor",
      }),
new MiniCssExtractPlugin(),
      // InjectManifest configuration for service worker integration.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // WebpackPwaManifest configuration to generate a manifest file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#225CA3",
        theme_color: "#225CA3",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            purpose: "any",
          },

          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            purpose: "maskable",
          },
        ],
      }),
    ],

    // here Define rules for processing different types of files (e.g., CSS, Babel for JavaScript).
    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
         {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
