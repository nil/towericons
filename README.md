![Preview of Nilicon icons](https://user-images.githubusercontent.com/13088397/80711253-59b46480-8af0-11ea-9118-e867400018a8.png)

# Nilicons
An icon pack for the modern designer and developer.

[![Build status](https://travis-ci.org/nil/nilicons.svg?branch=master)](https://travis-ci.org/nil/nilicons)
[![Dependencies status](https://img.shields.io/david/dev/nil/nilicons.svg)](https://david-dm.org/nil/nilicons)
[![Version](https://img.shields.io/npm/v/nilicons.svg)](https://www.npmjs.com/package/nilicons)
[![License](https://img.shields.io/npm/l/nilicons.svg)](https://github.com/nil/nilicons/blob/master/LICENSE)
[![Open Collective](https://img.shields.io/opencollective/all/nilicons?label=backers)](https://opencollective.com/nilicons)

<br />

Nilicons is a flexible pack of +200 icons designed to be scalable and look modern, and built upon the principles of simplicity, consistency, and flexibility. The set covers all common needs and many uncommon, and it offers an editable SVG of each icon, together with its React component.

Quick links: [Catalog](https://nil.github.io/nilicons) · [Design](https://nil.github.io/nilicons/guidelines) · [React](#installation) · [Figma]()

<img src="https://user-images.githubusercontent.com/13088397/80711254-5a4cfb00-8af0-11ea-9bd1-e92c1b80741d.png" aria-hidden="true" height="60px" />

## Installation

```sh
# With npm
$ npm install nilicons --save

# Or, with yarn
$ yarn add nilicons
```

<img src="https://user-images.githubusercontent.com/13088397/80711260-5b7e2800-8af0-11ea-9f10-b5b1d727a9a5.png" aria-hidden="true" height="60px" />

## Usage

To reduce the size of your bundle, each icon is located in an individual file. While this will make your production code significantly lighter, it will also require one import statement for each icon you would like to use. Each statement must include the name of the icon:

```js
import AlertCircle from 'nilicons/AlertCircle';
import ChevronDown from 'nilicons/ChevronDown';
```

However, Nilicons also comes with a single file that includes the React component of each icon, so you can import multiple icons at once from the same file or import all files in the icon pack. Please, be aware that using this method will result in *all* icons included in your build bundle.


```js
// Import muiltiple icons
import { Archive, ZoomIn } from 'nilicons';

// Import all icons
import * from 'nilicons';
```

No extra setup is necessary at this point. You can now start using the icon as a React component or pass it to another component as a prop:

```jsx
// Use as a component
<AlertCircle />

// Use as a prop
<YourComponent icon={ZoomIn} />
```

<img src="https://user-images.githubusercontent.com/13088397/80711258-5b7e2800-8af0-11ea-80a8-f179cc157f4a.png" aria-hidden="true" height="60px" />

## Options, <i style="opacity: 0.3">coming soon</i>

### Size, `auto`

Change the size of the icon. Nilicon icons are designed in a 32px grid, so using a multiple of this size is recommended (16px, 24px, 32px or 48px).

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

<img src="https://user-images.githubusercontent.com/13088397/80711250-591bce00-8af0-11ea-90ad-80510cbab674.png" aria-hidden="true" height="60px" />

## Contributing

If you find any issue, have troubles figuring out something or want to suggest a change, please [open an issue](https://github.com/nil/nilicons/issues/new/choose) or [make a pull request](https://github.com/nil/nilicons/compare). Any kind of contribution is welcomed and very appreciated.

### Local development

Clone the repository:

```sh
$ git clone https://github.com/nil/nilicons

$ cd nilicons
```

Install the dependencies:

```sh
$ npm install
```

To build the icons and components, Nilicons takes the .svg files inside a zip folder named `icons.zip`. This is because the icons are designed in Figma and exported using the [Dynamic Icon Export](https://github.com/nil/figma-dynamic-icon-export) plugin, which exports every icon in multiple sizes.

```sh
# Generate both icons and components
$ npm run build

# Only generate icons
$ npm run build -s
```

### Local design

To design a new icon or update an existing one, you must follow the [design guidelines](), though understand that sometimes is okay to brake these rules. There is a public [Figma file containing the whole pack of icons](), and a file with only the base grid is available for [Figma](), [Sketch](), [Illustrator]() and in [SVG]().

[Open a new issue](https://github.com/nil/nilicons/issues/new?assignees=&labels=icon+request&template=icon-request.md&title=%5BIcon+request%5D) with the `icon request` template if you are designing a new icon, or [open an issue](https://github.com/nil/nilicons/issues/new?assignees=&labels=icon+bug&template=icon-feedback.md&title=%5BIcon+bug%5D) with the `icon feedback` template if you want to suggest changes to an existing icon. The issue can contain one or multiple variations of your icon. If you are designing in Figma or Adobe XD, make sure the link can be viewed by everyone.

<img src="https://user-images.githubusercontent.com/13088397/80711256-5ae59180-8af0-11ea-9b9f-7934f4a19170.png" aria-hidden="true" height="60px" />

## License

Copyright © 2020 Nil Vila. Released under the [MIT License](https://github.com/nil/nilicons/blob/master/LICENSE).
