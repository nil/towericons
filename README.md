![Preview of Nilicon icons](https://user-images.githubusercontent.com/13088397/77939328-8897aa80-72a6-11ea-884e-3861f86fe48f.png)

# Nilicons
An icon pack for the modern designer and developer</p>

[![Build status](https://travis-ci.org/nil/nilicons.svg?branch=master)](https://travis-ci.org/nil/nilicons)
[![Dependencies status](https://img.shields.io/david/dev/nil/nilicons.svg)](https://david-dm.org/nil/nilicons)
[![Version](https://img.shields.io/npm/v/nilicons.svg)](https://www.npmjs.com/package/nilicons)
[![License](https://img.shields.io/npm/l/nilicons.svg)](https://github.com/nil/nilicons/blob/master/LICENSE)

Nilicons is a flexible pack of +200 icons designed to be scalable and look modern, and built upon the principles of simplicity, consistency, and flexibility. The set covers all common needs and many uncommon, and it offers an editable SVG of each icon, together with its React component.

[Catalog](nil.github.io/nilicons) · [Design](nil.github.io/nilicons/guidelines) · [React](#installation)

## Installation

```sh
npm install v-drag --save
```

v-drag’s source code is also available [uncompressed](https://raw.githubusercontent.com/nil/v-drag/master/src/index.js) and [minified](https://raw.githubusercontent.com/nil/v-drag/master/src/index.min.js).

## Usage

Import v-drag into any file you are planning to use it. You can use either import or require, although the first one is recommended as it’s part of the ES6 spec:

```js
import drag from "v-drag"
```

```js
const drag = require("v-drag");
```

Then call the v-drag plugin:

```js
Vue.use(drag);
```

No extra setup is necessary at this point. Add the `v-drag` attribute to any element to make it draggable:

```html
<div v-drag>Drag me!</div>
```

## Options

The default behavior for any element with the `v-drag` attribute is to be draggable in any direction and without a handle. However, this can be changed using an object or its equivalent shortcuts:

```html
<div v-drag="{ axis: 'x', handle: '#someElement' }">
  <div id="someElement">Handle</div>
</div>
```

Both the object and the values can be declared inline, as in the example above, or using the `data` object, computed properties, methods, props,…
