#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path')
const merge = require('lodash.merge')

/**
 * This script generates a JSON file that contains information
 * about input SVG files and a JavaScript to allow importing icons
 * from a single file and a util to find icons by its kebab-case name.
 *
 * Based on https://github.com/primer/octicons/blob/master/script/build.js
 * (https://github.com/primer/octicons/blob/3ba887a80bb62a276813506ceeef48dd64a3d1c4/script/build.js)
 * and https://github.com/mxstbr/octicons/blob/separate-bundle-per-icon/lib/octicons_react/script/build.js
 */

const inputDir = path.resolve(__dirname, '../temp-icons');
const outputDir = path.resolve(__dirname, '../lib')
const dataFile = path.join(outputDir, 'data.json');
const iconsFile = path.join(outputDir, 'icons.js')
const generatedText = '/* THIS FILE IS GENERATED. DO NOT EDIT IT. */'

// Convert kebab-case to CamelCase
function camelCase(str) {
  return str.replace(/(^|-)([a-z]|\d)/g, (_, __, c) => c.toUpperCase())
}

// A list of all files inside the input directory
const fileList = fs.readdirSync(inputDir).map((file) => path.join(inputDir, `/${file}`));

// Error if the input directory is empty
if (fileList.length === 0) {
  console.error('No input SVG files found')
  process.exit(1)
}

let exitCode = 0

// Return an array with each icon name and svg code
const iconList = fileList.map(filePath => {
  try {
    const fileShortPath = path.parse(filePath).base;
    const name = path.parse(filePath).name;
    const svg = fs.readFileSync(path.resolve(filePath), 'utf8')

    const viewBoxPattern = /viewBox/
    const viewBoxFormatPattern = /viewBox="(0 0 ([0-9]+) ([0-9]+))/;
    const clipPathPattern = /clip-path/;

    // Error when there is no viewBox
    if (!viewBoxPattern.test(svg)) {
      throw new Error(`${fileShortPath}: Missing viewBox attribute.`)
    }

    // Error when viewBox does not have the correct pattern
    if (!viewBoxFormatPattern.test(svg)) {
      throw new Error(
        `${fileShortPath}: Pattern for ViewBox attribute should be: "0 0 <width> <height>"`
      )
    }

    // Error when there is a clip-path tag
    if (clipPathPattern.test(svg)) {
      throw new Error(`${fileShortPath}: Invalid clip-path tag.`)
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

// Exit early if any errors occurred
if (exitCode !== 0) {
  process.exit(exitCode)
}

// Write JSON file
fs.outputJsonSync(dataFile, iconList.reduce(
  (acc, icon) =>
    merge(acc, {
      [icon.name]: {
        name: icon.name,
        path: icon.path
      }
    }),
  {}
));

console.log('✅ data.json created');

// Generate text that will be later written in a new file
function writeIcons(file) {
  const count = iconList.length
  const code = `${generatedText}
${iconList.map(({ name }) => `import ${camelCase(name)} from './build/${camelCase(name)}';`).join('\n')}

const iconsByName = {
  ${iconList.map(({ name }) => `'${name}': ${camelCase(name)}`).join(',\n  ')}
};

function getIconByName(name) {
  return iconsByName[name];
};

export {
  getIconByName,
  iconsByName,
  ${iconList.map(({ name }) => camelCase(name)).join(',\n  ')}
};`
  return fs.writeFile(file, code, 'utf8').then(() => {
    console.log('Wrote %s with %d exports', file, count)
    return iconList
  })
}

// Create new file and write all the exports and functions
fs.mkdirs(outputDir).then(() => {
  writeIcons(iconsFile)
  console.log('✅ icons.js created');
}).catch(error => {
  throw new Error(error)
  process.exit(1)
});
