#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs-extra')
const path = require('path');

/**
 * This script goes through all files in the source directory
 * and deletes those that are React components.
 */

const inputDir = path.resolve(__dirname, '..');
const fileList = fs.readdirSync(inputDir).filter(file => /[A-Z](.+)?\.js/.test(file));

for (const fileName of fileList) {
  const filePath = path.join(inputDir, `/${fileName}`);

  fs.unlinkSync(filePath)
}
