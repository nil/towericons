#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const cheerio = require('cheerio')
const yargs = require('yargs')
const merge = require('lodash.merge')
const { join, resolve } = require('path')

// This script generates a JSON file that contains information about input SVG files.
// Based on https://github.com/primer/octicons/blob/master/script/build.js
// (https://github.com/primer/octicons/blob/3ba887a80bb62a276813506ceeef48dd64a3d1c4/script/build.js)
// and https://github.com/mxstbr/octicons/blob/separate-bundle-per-icon/lib/octicons_react/script/build.js

const srcDir = resolve(__dirname, '../lib')
const dataFile = join(srcDir, 'data.json');
const newIconsFile = join(srcDir, 'icons.js')

const GENERATED_HEADER = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

function camelCase(str) {
  return str.replace(/(^|-)([a-z]|\d)/g, (_, __, c) => c.toUpperCase())
}

const {argv} = yargs
  .usage('Usage: $0 --input <input filepaths> --output <output filepath>')
  .example('$0 --input icons/**/*.svg --output build/data.json')
  .option('input', {
    alias: 'i',
    type: 'array',
    demandOption: true,
    describe: 'Input SVG files'
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    describe: 'Ouput JSON file. Defaults to stdout if no output file is provided.'
  })

// The `argv.input` array could contain globs (e.g. "**/*.svg").
const filepaths = globby.sync(argv.input)
const svgFilepaths = filepaths.filter(filepath => path.parse(filepath).ext === '.svg')

// The icon name will not include its category, except for these categories.
const categoryException = ['arrow', 'chevron', 'git']

if (svgFilepaths.length === 0) {
  console.error('No input SVG file(s) found')
  process.exit(1)
}

let exitCode = 0
let vueComponents;

const icons = svgFilepaths.map(filepath => {
  try {

    const filename = path.parse(filepath).base;
    const dirname = path.parse(filepath).dir;
    const filenamePattern = /(.+).svg/;
    const categoryPattern = /([^/]*)$/;
    const category = dirname.match(categoryPattern)[1];
    const svg = fs.readFileSync(path.resolve(filepath), 'utf8')
    const svgElement = cheerio.load(svg)('svg')
    const svgViewBox = svgElement.attr('viewBox')

    let name = filename.match(filenamePattern)[1];

    // Append category to the icon name if it is included in the exceptions list.
    if (categoryException.includes(category)) {
      name = `${category}-${name}`
    }

    if (!svgViewBox) {
      throw new Error(`${filename}: Missing viewBox attribute.`)
    }

    const viewBoxPattern = /0 0 ([0-9]+) ([0-9]+)/;
    const clipPathPattern = /clip-path/;

    if (!viewBoxPattern.test(svgViewBox)) {
      throw new Error(
        `${filename}: Invalid viewBox attribute. The viewBox attribute should be in the following format: "0 0 <width> <height>"`
      )
    }

    if (clipPathPattern.test(svg)) {
      throw new Error(`${filename}: Invalid clip-path tag.`)
    }

    return {
      name,
      path: svg
    }
  } catch (error) {
    console.error(error)

    // Instead of exiting immediately, we set exitCode to 1 and continue
    // iterating through the rest of the SVGs. This allows us to identify all
    // the SVGs that have errors, not just the first one. An exit code of 1
    // indicates that an error occured.
    // Reference: https://nodejs.org/api/process.html#process_exit_codes
    exitCode = 1
    return null
  }
})

// Exit early if any errors occurred.
if (exitCode !== 0) {
  process.exit(exitCode)
}

const iconsByName = icons.reduce(
  (acc, icon) =>
    merge(acc, {
      [icon.name]: {
        name: icon.name,
        path: icon.path
      }
    }),
  {}
)

if (argv.output) {
  fs.outputJsonSync(dataFile, iconsByName);

  for (const key in iconsByName) {
    const icon = iconsByName[key];
    const componentName = camelCase(icon.name);
    const fileContent = `const ${componentName} = {\n\trender() {\n\t\treturn ${icon.path}\n\t}\n};\n\nexport default ${componentName};`;

    fs.writeFileSync(path.resolve(`${argv.output}/${componentName}.js`), fileContent);
  }


} else {
  process.stdout.write(JSON.stringify(iconsByName))
}

const newIcons = Object.values(iconsByName);

function writeIcons(file) {
  const count = newIcons.length
  const code = `${GENERATED_HEADER}
${newIcons.map(({ name }) => `import ${camelCase(name)} from './build/${camelCase(name)}'`).join('\n')}

const newIconsByName = {
  ${newIcons.map(({ name }) => `'${name}': ${camelCase(name)}`).join(',\n  ')}
}

function getIconByName(name) {
  return newIconsByName[name]
}

export {
  getIconByName,
  newIconsByName,
  ${newIcons.map(({ name }) => camelCase(name)).join(',\n  ')}
}`
  return fse.writeFile(file, code, 'utf8').then(() => {
    console.warn('wrote %s with %d exports', file, count)
    return newIcons
  })
}

fse
  .mkdirs(srcDir)
  .then(() => writeIcons(newIconsFile))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
