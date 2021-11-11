#! /usr/bin/env sh

dir=$(dirname $(realpath $0))

echo $dir

node -r esm $dir/cli.js $@
