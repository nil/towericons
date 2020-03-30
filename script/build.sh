#!/bin/bash

# Exit on any error
set -e

rm -rf icons
echo "✅ icons directory removed"

npm run unzip
echo "✅ Unzip completed"

npm run svgo
echo "✅ Icons optimized"

if [[ $* != *-s* ]]; then
  mkdir 'temp-icons'
  echo "✅ temp-icons direcotry created"

  npm run build:temp
  echo "✅ Icons copied to a new directory"

  npm run build:icons
  echo "✅ React component files created"

  npm run build:data
  # Success messages are inside the script

  npm run babel
  echo "✅ Icons correctly compiled"

  npm run test
  echo "✅ Tests are successfull"

  rm -rf 'temp-icons'
  echo "✅ temp-icons directory removed"
fi

echo ""
echo "✨  Success"
