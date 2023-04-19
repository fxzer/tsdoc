const fs = require('fs')
const path = require('path')


//判断是否是文章文件
function isArticleDir(dir) {
  let isExclude = /^(public|index.md|.*\.ts|demo.*|\..*)$/.test(dir)
  return !isExclude
}


function splitPath(path) {
  return path.split('/').filter((item) => item !== '')
}

//生成一级分组 
function generateTopDir(dir,locale){
  return fs.readdirSync(dir).filter((item) => isArticleDir(item)).reduce((pre,cur) => {
     let key = `/${locale}/${cur}/`
     if(!pre[key]){
       pre[key] = []
       return pre
     }
   },{})
 }

module.exports = {
  isArticleDir,
  splitPath,
  generateTopDir
}