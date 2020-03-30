const fs = require('fs-extra');

/**
 * Get all files inside a directory and the directories inside it
 *
 * @param {dirPath} string - Directory path
 * @param {fileList} array - List of files.
 */

module.exports = function readFullDir(dirPath, fileList) {
  const files = fs.readdirSync(dirPath);
  fileList = fileList || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      fileList = readFullDir(`${dirPath}/${file}`, fileList)
    } else {
      fileList.push(`${dirPath}/${file}`)
    }
  })

  return fileList;
}
