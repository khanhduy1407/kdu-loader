# Template for Functional Components

> New in 13.1.0, requires kdu >= 2.5.0

With `kdu-loader >= 13.3.0`, functional components defined as a Single-File Component in a `*.kdu` file now enjoys proper template compilation, Scoped CSS and hot-reloading support.

To denote a template that should be compiled as a functional component, add the `functional` attribute to the template block. This also allows omitting the `functional` option in the `<script>` block.

Expressions in the template are evaluated in the functional render context. This means props need to be accessed as `props.xxx` in the template:

``` html
<template functional>
  <div>{{ props.foo }}</div>
</template>
```
