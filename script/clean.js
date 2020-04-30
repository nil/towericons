#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

/**
 * This script goes through all files in the source directory
 * and deletes those that are React components.
 */

const inputDir = path.resolve(__dirname, '..');
const indexFile = path.resolve(__dirname, '../index.js');
const fileList = fs.readdirSync(inputDir).filter((file) => /[A-Z](.+)?\.js/.test(file));

// Remove all component files
fileList.forEach((fileName) => {
  const filePath = path.join(inputDir, `/${fileName}`);

  fs.unlinkSync(filePath);
});

// Remove index.js
fs.unlinkSync(indexFile);
