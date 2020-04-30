#!/bin/bash

# Exit on any error
set -e

if [ -f "icons.zip" ]; then
  rm -rf icons
  echo "✅ icons directory removed"

  unzip -o -d icons icons.zip
  echo "✅ Unzip completed"

  svgo --config=.svgo.yml --pretty --disable=removeDimensions -f icons -r
  echo "✅ Icons optimized"

  node script/lint.js
  echo "✅ Icons linted without errors"

  rm icons.zip
  echo "✅ icons.zip removed"
fi

if [[ $* != *-s* ]]; then
  if [ ! -d "temp-icons" ]; then
    mkdir "temp-icons"
    echo "✅ temp-icons direcotry created"
  fi

  if [ -d "lib" ]; then
    rm -rf "lib"
    echo "✅ lib directory removed"
  fi

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

  rm -rf "temp-icons"
  echo "✅ temp-icons directory removed"
fi

echo ""
echo "✨  Success"
