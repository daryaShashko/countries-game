const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
    bundle: ['react-hot-loader/patch', "./src/index.jsx"],
    styles: "./src/styles/includes.scss"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')(),
                  require('postcss-cssnext')(),
                  require('postcss-nested'),
                  require('postcss-initial')({
                    reset: 'inherited' // reset only inherited rules
                  }),
                  require('postcss-mixins'),
                  require('postcss-simple-vars')({
                    unknown: function unknown(node, name, result) {
                      node.warn(result, 'Unknown variable ' + name)
                    }
                  }),
                  require('postcss-math'),
                  require('postcss-color-function')
                ]
              }
            },
            "sass-loader"
          ]
        })
      }
    ]
  },


  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + "/src/index.html",
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })
  ],

  devServer: {
    contentBase: "./build",
    port: 7700
  }
};