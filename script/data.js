#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const cheerio = require('cheerio')
const trimNewlines = require('trim-newlines')
const yargs = require('yargs')
const merge = require('lodash.merge')

// This script generates a JSON file that contains information about input SVG files.
// Based on https://github.com/primer/octicons/blob/master/script/build.js
// (https://github.com/primer/octicons/blob/3ba887a80bb62a276813506ceeef48dd64a3d1c4/script/build.js)

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
    const svgPath = trimNewlines(svgElement.html()).trim();

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

    if (clipPathPattern.test(svgPath)) {
      throw new Error(`${filename}: Invalid clip-path tag.`)
    }

    return {
      name,
      path: svgPath
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
  fs.outputJsonSync(path.resolve(argv.output), iconsByName)
} else {
  process.stdout.write(JSON.stringify(iconsByName))
}
