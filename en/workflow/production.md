# Production Build

Here's an example config:

``` js
// webpack.config.js
module.exports = {
  // ... other options
  plugins: [
    // short-circuits all Kdu warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // Webpack 1 only - optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
```

Obviously we don't want to use this config during development, so there are several ways to approach this:

1. Dynamically build up the configuration object based on an environment variable;

2. Or, use two separate Webpack config files, one for development and one for production. And maybe share some common options between them in a third file.

It's really up to you as long as it achieves the goal.
