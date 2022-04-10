#!/usr/bin/env bash

cd ..

rm -rf examples-dist

babel \
  --config-file ./examples/snack.babel.config.js \
  --out-dir examples-dist \
  --ignore "examples/node_modules/**/*" \
  --extensions .ts,.tsx \
  examples

cp examples/{package.json,README.md} examples-dist

echo '` Use the preview panel on the right to try out the example app.' > examples-dist/App.js
echo '  See https://github.com/tjjfvi/solid-native/blob/sne/examples/README.md `' >> examples-dist/App.js
cat examples/App.js >> examples-dist/App.js
