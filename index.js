const shell = require('shelljs');

// shell.echo('')

// Creates icons/ directory if it doesn't exist
if (!shell.test('-e', 'icons/')) {
  shell.mkdir('icons')
}

// Renames all files inside icon/ directory
shell.find('icon /*').forEach(function (file) {
  if (file.includes('.')) {
    const slashExp = new RegExp(' ?\/ ?', 'gi');
    const iconsExp = new RegExp('icon-', 'gi');
    const miscExp = new RegExp('misc-', 'gi');
    const newName = file.replace(slashExp, '-').replace(iconsExp, 'icons/').replace(miscExp, '');

    shell.mv(file, newName);
  }
})

// Remove icon/ directory
shell.rm('-r', 'icon /')

// Reduce the size of all icons
shell.exec('svgo --config=.svgo.yml -f icons');
