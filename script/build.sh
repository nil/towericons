#!/bin/bash

# Exit on any error
set -e

# Start text
echo "Start building Nilicon icons and components"

rm -rf icons
echo "✅ icons directory removed"

unzip -o -d icons icons.zip
rm icons.zip
echo "✅ Unzip completed"

npm run svgo
echo "✅ Icons optimized"

mkdir 'temp-icons'
echo "✅ temp-icons direcotry created"

node script/rename.js
echo "✅ Icons copied to a new directory"

npm run svgr
echo "✅ React component files created"

node script/create.js
# Success messages are inside the script

rm -rf 'temp-icons'
echo "✅ temp-icons directory removed"

echo ""
echo "✨  Success"
