# Kdu Component Spec

A `*.kdu` file is a custom file format that uses HTML-like syntax to describe a Kdu component. Each `*.kdu` file consists of three types of top-level language blocks: `<template>`, `<script>`, and `<style>`, and optionally additional custom blocks:

``` html
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

`kdu-loader` will parse the file, extract each language block, pipe them through other loaders if necessary, and finally assemble them back into a CommonJS module whose `module.exports` is a Kdu component options object.

`kdu-loader` supports using non-default languages, such as CSS pre-processors and compile-to-HTML template languages, by specifying the `lang` attribute for a language block. For example, you can use SASS for the style of your component like this:

``` html
<style lang="sass">
  /* write SASS! */
</style>
```

More details can be found in [Using Pre-Processors](../configurations/pre-processors.md).

### Language Blocks

#### `<template>`

- Default language: `html`.

- Each `*.kdu` file can contain at most one `<template>` block at a time.

- Contents will be extracted as a string and used as the `template` option for the compiled Kdu component.

#### `<script>`

- Default language: `js` (ES2015 is supported automatically if `babel-loader` or `buble-loader` is detected).

- Each `*.kdu` file can contain at most one `<script>` block at a time.

- The script is executed in a CommonJS like environment (just like a normal `.js` module bundled via Webpack), which means you can `require()` other dependencies. And with ES2015 support, you can also use the `import` and `export` syntax.

- The script must export a Kdu component options object. Exporting an extended constructor created by `Kdu.extend()` is also supported, but a plain object is preferred.

#### `<style>`

- Default Language: `css`.

- Multiple `<style>` tags are supported in a single `*.kdu` file.

- A `<style>` tag can have `scoped` or `module` attributes (see [Scoped CSS](../features/scoped-css.md) and [CSS Modules](../features/css-modules.md)) to help encapsulate the styles to the current component. Multiple `<style>` tags with different encapsulation modes can be mixed in the same component.

- By default, contents will be extracted and dynamically inserted into the document's `<head>` as an actual `<style>` tag using `style-loader`. It's also possible to [configure Webpack so that all styles in all components are extracted into a single CSS file](../configurations/extract-css.md).

### Custom Blocks

> Only supported in kdu-loader 10.2.0+

Additional custom blocks can be included in a `*.kdu` file for any project specific needs, for example a `<docs>` block. `kdu-loader` will use the tag name to look up which webpack loaders should be applied to the contents of the section. The webpack loaders should be specified in the `loaders` section of `kdu-loader` options.

For mode details, see [Custom Blocks](../configurations/custom-blocks.md).

### Src Imports

If you prefer splitting up your `*.kdu` components into multiple files, you can use the `src` attribute to import an external file for a language block:

``` html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Beware that `src` imports follow the same path resolution rules to CommonJS `require()` calls, which means for relative paths you need to start with `./`, and you can import resources directly from installed NPM packages, e.g:

``` html
<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css">
```

`src` imports also work with custom blocks, e.g.:

``` html
<unit-test src="./unit-test.js">
</unit-test>
```

### Syntax Highlighting

<!-- todo: Jetbrains products -->
Currently there is syntax highlighting support for [Sublime Text](https://github.com/khanhduy1407/kdu-syntax-highlight), [Atom](https://atom.io/packages/language-kdu), [Vim](https://github.com/khanhduy1407/vim-kdu), [Visual Studio Code](https://marketplace.visualstudio.com/items/nkduy.kdu), [Brackets](https://github.com/khanhduy1407/brackets-kdu), and [JetBrains products](https://plugins.jetbrains.com/plugin/8057) (WebStorm, PhpStorm, etc). Contributions for other editors/IDEs are highly appreciated! If you are not using any pre-processors in Kdu components, you can also get by treating `*.kdu` files as HTML in your editor.

### Comments

Inside each block you shall use the comment syntax of the language being used (HTML, CSS, JavaScript, Jade, etc). For top-level comments, use HTML comment syntax: `<!-- comment contents here -->`
