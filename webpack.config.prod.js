// Webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pkg = require('./package.json');

module.exports = function(env) {
  const bundleFolder = 'dist/prod/';
  const vendorScripts = Object.keys(pkg.dependencies);

  return {
    mode: 'production',
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        allChunks: true,
        filename: 'css/[name].min.css'
      })
    ],
    performance: {
      hints: false
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json', '.tsx'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    optimization: {
      occurrenceOrder: true,
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true
          },
          default: false
        }
      },
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    entry: {
      vendor: vendorScripts,
      entry: path.join(__dirname, 'src/entry.tsx')
    },
    stats: {
      modules: false,
      children: false
    },
    output: {
      filename: '[name].min.js',
      path: path.join(__dirname, bundleFolder),
      publicPath: bundleFolder
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
            MiniCssExtractPlugin.loader,
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
            MiniCssExtractPlugin.loader,
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
