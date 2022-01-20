# Linting

You may have been wondering how do you lint your code inside `*.kdu` files, since they are not JavaScript. We will assume you are using [ESLint](https://eslint.org/) (if you are not, you should!).

You will also need the [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) which supports extracting and linting the JavaScript inside `*.kdu` files.

Make sure to include the plugin in your ESLint config:

``` json
"plugins": [
  "html"
]
```

Then from the command line:

``` bash
eslint --ext js,kdu MyComponent.kdu
```

Another option is using [eslint-loader](https://github.com/MoOx/eslint-loader) so that your `*.kdu` files are automatically linted on save during development:

``` bash
npm install eslint eslint-loader --save-dev
```

``` js
// webpack.config.js
module.exports = {
  // ... other options
  module: {
    loaders: [
      {
        test: /\.kdu$/,
        loader: 'kdu!eslint'
      }
    ]
  }
}
```

Note that Webpack loader chains are applied **right-first**. Make sure to apply `eslint` before `kdu` so we are linting the pre-compile source code.

One thing we need to consider is using third party `*.kdu` components shipped in NPM packages. In such case, we want to use `kdu-loader` to process the third party component, but do not want to lint it. We can separate the linting into Webpack's [preLoaders](https://webpack.github.io/docs/loaders.html#loader-order):

``` js
// webpack.config.js
module.exports = {
  // ... other options
  module: {
    // only lint local *.kdu files
    preLoaders: [
      {
        test: /\.kdu$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    // but use kdu-loader for all *.kdu files
    loaders: [
      {
        test: /\.kdu$/,
        loader: 'kdu'
      }
    ]
  }
}
```

For Webpack 2.x:

``` js
// webpack.config.js
module.exports = {
  // ... other options
  module: {
    rules: [
      // only lint local *.kdu files
      {
        enforce: 'pre',
        test: /\.kdu$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      // but use kdu-loader for all *.kdu files
      {
        test: /\.kdu$/,
        loader: 'kdu-loader'
      }
    ]
  }
}
```
