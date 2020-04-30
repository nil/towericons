#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const readFullDir = require('./utils/readFullDir');


/**
 * This script copies all icons to a new directory, with their correct
 * component name in kebab case. This has to be done as some icons will have
 * their category in its name and svgr does not allow to edit the name of an icon.
 */

const inputDir = path.resolve(__dirname, '../icons');
const outputDir = path.resolve(__dirname, '../temp-icons');

// Return an array with each icon name and current path
const iconList = readFullDir(inputDir).map((item) => ({
  path: item,
  name: path.basename(item)
}));

// Copy file to the output directory with a new name
iconList.forEach((icon) => {
  fs.copyFile(icon.path, path.resolve(outputDir, `./${icon.name}`));
});
