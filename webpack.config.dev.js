// Webpack v4
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  const bundleFolder = 'dist/dev/';

  return {
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html')
      }),
      new VueLoaderPlugin()
    ],
    performance: {
      hints: false
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json', '.tsx'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    entry: {
      entry: path.join(__dirname, 'src/entry.tsx')
    },
    stats: {
      modules: false,
      children: false
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, bundleFolder)
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader',
              tsx: 'babel-loader!ts-loader'
            }
          }
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/TS\.vue$/] }
        },
        {
          test: /\.tsx$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/TSX\.vue$/] }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/'
            }
          }
        },
        {
          test: /\.(gif|jpg|png|jpe?g)([\?]?.*)$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};
