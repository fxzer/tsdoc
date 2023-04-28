#!/usr/bin/env sh

set -e

rm -rf dist

pnpm run build

cd dist

git init

git add .

git commit -m 'feat: update dist'

git push -f git@github.com:fxzer/tsdoc-vitepress.git main:gh-pages
git push -f git@gitee.com:fxzer/tsdoc-vitepress.git main:gh-pages

cd -
