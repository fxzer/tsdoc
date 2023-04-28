#!/usr/bin/env sh

set -e

pnpm build

cd dist

git init 

git add -A

git commit -m '🎉deploy gh-pages🎉'

git push -f git@gitee.com:fxzer/tsdoc-vitepress.git main:gh-pages

cd ..

rm -rf  dist

cd -
