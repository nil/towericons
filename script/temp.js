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
const categoryException = ['arrow', 'chevron', 'git'];

// Return an array with each icon name and current path
const iconList = readFullDir(inputDir).map((item) => {
  const shortPath = item.replace(`${inputDir}/`, '');
  const category = shortPath.match(/^.+?(?=\/)/)[0];

  const iconName = categoryException.includes(category)
    ? shortPath.replace(/\//g, '-')
    : shortPath.replace(/^.+?\//g, '').replace(/\//g, '-');

  return { path: item, name: iconName };
});

// Copy file to the output directory with a new name
for (const icon of iconList) {
  fs.copyFile(icon.path, path.resolve(outputDir, `./${icon.name}`))
}
