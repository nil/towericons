#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path');

/**
 * This script checks that all generated files are where they should
 * before publishing the package to npm.
 */

const testFiles = ['AlertCircle.js', 'GitFork.js', 'Settings.js', 'index.js', 'lib/data.json'];

// Check if any of the example files exist
for (const file of testFiles) {
  const status = fs.existsSync(path.resolve(__dirname, `../${file}`));

  if (!status) {
    throw new Error(`Some files do not exist (${file})`);
  }
}

// Check if index.js inside lib/icons does not exist
const indexStatus = fs.existsSync(path.resolve(__dirname, `../lib/icons/index.js`));

if (indexStatus) {
  throw new Error(`index.js still exists inside lib/icons`);
}
