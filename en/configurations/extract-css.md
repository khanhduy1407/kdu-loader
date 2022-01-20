# Extracting CSS into a Single File

``` bash
npm install extract-text-webpack-plugin --save-dev
```

## The Easy Way

> requires kdu-loader@^13.5.0 and webpack@^2.0.0

``` js
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  // other options...
  module: {
    rules: [
      {
        test: /\.kdu$/,
        loader: 'kdu-loader',
        options: {
          extractCSS: true
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
}
```

The above will automatically handle extraction for `<style>` inside `*.kdu` files and works with most pre-processors out of the box.

Note this only extracts `*.kdu` files though - CSS imported in JavaScript still needs to be configured separately.

## Manual Configuration

Example config to extract all the processed CSS in all Kdu components into a single CSS file:

### Webpack 2.x


``` js
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  // other options...
  module: {
    rules: [
      {
        test: /\.kdu$/,
        loader: 'kdu-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'kdu-style-loader' // <- this is a dep of kdu-loader, so no need to explicitly install if using npm3
            })
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
}
```

### Webpack 1.x

``` bash
npm install extract-text-webpack-plugin --save-dev
```

``` js
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  // other options...
  module: {
    loaders: [
      {
        test: /\.kdu$/,
        loader: 'kdu'
      },
    ]
  },
  kdu: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      // you can also include <style lang="less"> or other langauges
      less: ExtractTextPlugin.extract("css!less")
    }
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
}
```
