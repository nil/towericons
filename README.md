![Preview of Towericons icons](https://user-images.githubusercontent.com/13088397/80737994-a3af4180-8b14-11ea-8877-ca442b0a3750.png)

# Towericons
An icon pack for the modern designer and developer.

[![Donate](https://img.shields.io/static/v1?label=&message=Donate&color=003087&width=400)](https://paypal.me/nilvilam)
[![Build status](https://travis-ci.org/nil/towericons.svg?branch=master)](https://travis-ci.org/nil/towericons)
[![Dependencies status](https://img.shields.io/david/dev/nil/towericons.svg)](https://david-dm.org/nil/towericons)
[![Version](https://img.shields.io/npm/v/towericons.svg)](https://www.npmjs.com/package/towericons)
[![License](https://img.shields.io/npm/l/towericons.svg)](https://github.com/nil/towericons/blob/master/LICENSE)
[![Open Collective](https://img.shields.io/opencollective/all/towericons?label=backers)](https://opencollective.com/towericons)

<br />

Towericons is a flexible pack of +200 icons designed to be scalable and look modern, and built upon the principles of simplicity, consistency, and flexibility. The set covers all common needs and many uncommon, and it offers an editable SVG of each icon, together with its React component.

Quick links:&emsp;[Catalog](https://nil.github.io/towericons) · [Design](https://nil.github.io/towericons/guidelines) · [React](#installation) · [Figma](https://www.figma.com/file/84My22ahq47CcqA8b9QEhw/Towericons?node-id=0%3A1) · [Donate](https://paypal.me/nilvilam)

<img src="https://user-images.githubusercontent.com/13088397/80737999-a447d800-8b14-11ea-8dfb-f3da2d24c4fe.png" aria-hidden="true" height="60px" />

## Installation

```sh
# With npm
$ npm install towericons --save

# Or, with yarn
$ yarn add towericons
```

<img src="https://user-images.githubusercontent.com/13088397/80738004-a5790500-8b14-11ea-920d-c4a8c0305e0a.png" aria-hidden="true" height="60px" />

## Usage

To reduce the size of your bundle, each icon is located in an individual file. While this will make your production code significantly lighter, it will also require one import statement for each icon you would like to use. Each statement must include the name of the icon:

```js
import AlertCircle from 'towericons/AlertCircle';
import ChevronDown from 'towericons/ChevronDown';
```

However, Towericons also comes with a single file that includes the React component of each icon, so you can import multiple icons at once from the same file or import all files in the icon pack. Please, be aware that using this method will result in *all* icons included in your build bundle.


```js
// Import muiltiple icons
import { Archive, ZoomIn } from 'towericons';

// Import all icons
import * from 'towericons';
```

No extra setup is necessary at this point. You can now start using the icon as a React component or pass it to another component as a prop:

```jsx
// Use as a component
<AlertCircle />

// Use as a prop
<YourComponent icon={ZoomIn} />
```

<img src="https://user-images.githubusercontent.com/13088397/80738002-a4e06e80-8b14-11ea-8343-296bf4c794c9.png" aria-hidden="true" height="60px" />

## Options, <i style="opacity: 0.3">coming soon</i>

### Size, `auto`

Change the size of the icon. Towericons icons are designed in a 32px grid, so using a multiple of this size is recommended (16px, 24px, 32px or 48px).

```js
<AlertCircle size={32} />
<ChevronDown size="24px" />
<ZoomIn size="auto" />
```

### Color, `undefined`

Set a custom color for the icon. By default it is unspecified, so it will take the color defined by the CSS or, if there is no style applied, black.

```js
<Archive color="blue" />
<ChevronDown color="#FFF000" />
<ZoomIn color="currentColor" />
```

<img src="https://user-images.githubusercontent.com/13088397/80737989-a316ab00-8b14-11ea-98cf-f9c68f9b0cf5.png" aria-hidden="true" height="60px" />

## Contributing

If you find any issue, have troubles figuring out something or want to suggest a change, please [open an issue](https://github.com/nil/towericons/issues/new/choose) or [make a pull request](https://github.com/nil/towericons/compare). You can also [donate to keep the repo alive](https://paypal.me/nilvilam). Any kind of contribution is welcomed and very appreciated.

### Local development

Clone the repository:

```sh
$ git clone https://github.com/nil/towericons

$ cd towericons
```

Install the dependencies:

```sh
$ npm install
```

To build the icons and components, Towericons takes the .svg files inside a zip folder named `icons.zip`. This is because the icons are designed in Figma and exported using the [Dynamic Icon Export](https://github.com/nil/figma-dynamic-icon-export) plugin, which exports every icon in multiple sizes.

```sh
# Generate both icons and components
$ npm run build

# Only generate icons
$ npm run build -s
```

### Local design

To design a new icon or update an existing one, you must follow the [design guidelines](), though understand that sometimes is okay to brake these rules. There is a public [Figma file containing the whole pack of icons](), and a file with only the base grid is available for [Figma](), [Sketch](), [Illustrator]() and in [SVG]().

[Open a new issue](https://github.com/nil/towericons/issues/new?assignees=&labels=icon+request&template=icon-request.md&title=%5BIcon+request%5D) with the `icon request` template if you are designing a new icon, or [open an issue](https://github.com/nil/towericons/issues/new?assignees=&labels=icon+bug&template=icon-feedback.md&title=%5BIcon+bug%5D) with the `icon feedback` template if you want to suggest changes to an existing icon. The issue can contain one or multiple variations of your icon. If you are designing in Figma or Adobe XD, make sure the link can be viewed by everyone.

<img src="https://user-images.githubusercontent.com/13088397/80738001-a4e06e80-8b14-11ea-88ad-9d8735c37ade.png" aria-hidden="true" height="60px" />

## License

Copyright © 2020 Nil Vila. Released under the [MIT License](https://github.com/nil/towericons/blob/master/LICENSE).

<hr />
<br />

<a href="https://paypal.me/nilvilam" target="_blank">
  <img src="https://img.shields.io/static/v1?label=&message=Donate&color=003087" alt="Donate" height="32px" />
</a>
<a href="https://opencolective.com/towericons" target="_blank">
  <img src="https://img.shields.io/opencollective/all/towericons?label=backers" alt="Become a backer" height="32px" />
</a>
