const load = require('postcss-load-config')

let loaded

function isObject (val) {
  return val && typeof val === 'object'
}

module.exports = function loadPostcssConfig (loaderContext, inlineConfig = {}) {
  if (process.env.KDU_LOADER_TEST || !loaded) {
    const config = inlineConfig.config || {}
    const ctx = { webpack: loaderContext }
    if (config.ctx) {
      ctx.options = config.ctx
    }
    loaded = load(ctx, config.path, { argv: false }).catch(err => {
      // postcss-load-config throws error when no config file is found,
      // but for us it's optional. only emit other errors
      if (err.message.indexOf('No PostCSS Config found') < 0) {
        loaderContext.emitError(err)
      }
    })
  }

  return loaded.then(config => {
    let plugins = []
    let options = {}

    // inline postcss options for kdu-loader
    if (typeof inlineConfig === 'function') {
      inlineConfig = inlineConfig.call(this, this)
    }
    if (Array.isArray(inlineConfig)) {
      plugins = inlineConfig
    } else if (isObject(inlineConfig)) {
      plugins =
        typeof inlineConfig.plugins === 'function'
          ? inlineConfig.plugins.call(this, this)
          : inlineConfig.plugins || []
      options = inlineConfig.options || {}
    }

    // merge postcss config file
    if (config && config.plugins) {
      plugins = plugins.concat(config.plugins)
    }
    if (config && config.options) {
      options = Object.assign({}, config.options, options)
    }

    return {
      plugins,
      options
    }
  })
}
