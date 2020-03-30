#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const readFullDir = require('./utils/readFullDir');


/**
 * This script checks that all icons are exported properly, with the right
 * viewBox pattern, without strokes and without clipPaths.
 */

const inputDir = path.resolve(__dirname, '../icons');
const fileList = readFullDir(inputDir);
const viewBoxPattern = /viewBox/;
const viewBoxFormatPattern = /viewBox="(0 0 ([0-9]+) ([0-9]+))/;
const clipPathPattern = /clip-path/;
const strokePattern = /stroke/;

let exitCode = 0;

// Easily write the error message
function errorMessage(file, text) {
  console.error('\x1b[31m', `🛑 ${file}:`, '\x1b[0m', text);
}

// Error if the input directory is empty
if (fileList.length === 0) {
  console.error('🛑 No input SVG files found')
  process.exit(1)
}

for (const file of fileList) {
  const fileShortPath = path.parse(file).base;
  const svg = fs.readFileSync(path.resolve(file), 'utf8');

  // Error when there is no viewBox
  if (!viewBoxPattern.test(svg)) {
    errorMessage(fileShortPath, 'Missing viewBox attribute.');
    exitCode = 1;
  }

  // Error when viewBox does not have the correct pattern
  if (!viewBoxFormatPattern.test(svg)) {
    errorMessage(fileShortPath, 'Pattern for ViewBox attribute should be: "0 0 <width> <height>"');
    exitCode = 1;
  }

  // Error when there is a clip-path tag
  if (clipPathPattern.test(svg)) {
    errorMessage(fileShortPath, 'Invalid clip-path tag.');
    exitCode = 1;
  }

  // Error when there is a stroke attribute
  if (strokePattern.test(svg)) {
    errorMessage(fileShortPath, 'Invalid stroke and stroke-width attributes.');
    exitCode = 1;
  }

  // TODO: multiple path tags
}

// Exit early if any errors occurred
if (exitCode !== 0) {
  process.exit(exitCode)
}
