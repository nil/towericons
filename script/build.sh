#!/bin/bash

# Exit on any error
set -e

rm -rf icons
echo "✅ icons directory removed"

npm run unzip
echo "✅ Unzip completed"

npm run svgo
echo "✅ Icons optimized"

mkdir 'temp-icons'
echo "✅ temp-icons direcotry created"

npm run rename
echo "✅ Icons copied to a new directory"

npm run svgr
echo "✅ React component files created"

npm run babel
echo "✅ Icons correctly compiled"

npm run create
# Success messages are inside the script

rm -rf 'temp-icons'
echo "✅ temp-icons directory removed"

echo ""
echo "✨  Success"
