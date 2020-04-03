![Preview of Nilicon icons](https://user-images.githubusercontent.com/13088397/77941568-e4176780-72a9-11ea-9d1c-67a550180198.png)

# Nilicons
An icon pack for the modern designer and developer</p>

[![Build status](https://travis-ci.org/nil/nilicons.svg?branch=master)](https://travis-ci.org/nil/nilicons)
[![Dependencies status](https://img.shields.io/david/dev/nil/nilicons.svg)](https://david-dm.org/nil/nilicons)
[![Version](https://img.shields.io/npm/v/nilicons.svg)](https://www.npmjs.com/package/nilicons)
[![License](https://img.shields.io/npm/l/nilicons.svg)](https://github.com/nil/nilicons/blob/master/LICENSE)
[![Open Collective](https://img.shields.io/opencollective/all/nilicons?label=backers)](https://opencollective.com/nilicons)

<br />

Nilicons is a flexible pack of +200 icons designed to be scalable and look modern, and built upon the principles of simplicity, consistency, and flexibility. The set covers all common needs and many uncommon, and it offers an editable SVG of each icon, together with its React component.

Quick links: [Catalog](nil.github.io/nilicons) · [Design](nil.github.io/nilicons/guidelines) · [React](#installation)

<img src="https://user-images.githubusercontent.com/13088397/77941215-56d41300-72a9-11ea-9efd-8b0498416185.png" aria-hidden="true" height="60px" />

## Installation

```sh
npm install nilicons --save
```

<img src="https://user-images.githubusercontent.com/13088397/78355635-4e801e80-75ae-11ea-9e4b-7d6b63e3882a.png" aria-hidden="true" height="60px" />

## Usage

To reduce the size of your bundle, each icon is located in an individual file, so its usage is a bit more complicated than importing the default value from the package. [...]

### Import a single icon

This is the preferred method to import one single icon. Notice the icon's name is also included in the import path.

```js
import AlertCircle from 'nilicons/AlertCircle';
```

### Import multiple icons

```js
import { Archive, ZoomIn } from 'nilicons';
```

### Import all icons at once

```js
import * from 'nilicons';
```

No extra setup is necessary at this point. Add the `v-drag` attribute to any element to make it draggable:

```html
<div v-drag>Drag me!</div>
```

<img src="https://user-images.githubusercontent.com/13088397/77941215-56d41300-72a9-11ea-9efd-8b0498416185.png" aria-hidden="true" height="60px" />
