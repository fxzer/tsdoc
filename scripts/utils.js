const fs = require('fs')
const path = require('path')
const enTozh = require('./enTozh')


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

// 生成侧边栏
function deepGenerateSidebar(arr,locale) {
  //递归按照最后一级目录生成侧边栏
  const sidebar = {}
  arr.forEach((item) => {
    const [dir] = splitPath(item)
    if (!sidebar[dir]) {
      sidebar[dir] = []
    }
    sidebar[dir].push(item)
  })
  let sidebarList = []
  //按最后一级目录分组
  for (let key in sidebar) {
    let pathPice = sidebar[key].map((item) => splitPath(item))
    //如果pathPice[pathPice.length-1]相同,则合并
    pathPice = pathPice.reduce((pre, cur) => {
      let dirStr = cur.slice(0, -1).join('/')  // /problem/vueproject/
      let enText = cur[cur.length - 1].replace(/\.md$/, '')
      let text =  locale === 'en' ? enText : ( enTozh[enText] || enText)
      let link = `/${locale}/` + cur.join('/').replace(/\.md$/, '')
      pre[dirStr] = pre[dirStr] ? [...pre[dirStr], { text, link }] : [{ text, link }]
      return pre
    }, {})
    sidebarList.push(pathPice)
  }
  return sidebarList
}

//写入文件 到 docs/.vitepress/sidebar/
function writeFile(target,targetPath) {
  const targetStr = JSON.stringify(target, null, 2)
  //如果目录不存在则创建
  let targetDir = path.dirname(targetPath)
  //通过路径获取文件名
  const fileName = path.basename(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(path.resolve(__dirname, targetDir))
  }

  fs.writeFile(targetPath, `export default ${targetStr}`, (err) => {
    if (err) console.log(err)
    console.log(`===> 侧边栏文件 [ ${fileName} ] 生成成功!  <===\n`)
  })
}

function itemsHandler(sidebar, obj,locale) {
  const collapsedList = ['options', 'handbook-v1']
  Object.entries(sidebar).forEach(([key, items]) => {
    let keyArr = splitPath(key)
    let enText = keyArr[keyArr.length - 1]
    let text = locale === 'en' ? enText : ( enTozh[enText] || enText)
    //默认折叠
    const collapsed = collapsedList.includes(enText)
    let kpath = `/${locale}/${keyArr[0]}/`
    if (obj[kpath]) {
      obj[kpath].push({
        text,
        collapsible: true,
        collapsed,
        items,
      })
    } else {
      obj[kpath] = [{
        text,
        collapsible: true,
        collapsed,
        items,
      }]
    }
  })
  return obj
}



module.exports = {
  isArticleDir,
  splitPath,
  writeFile,
  generateTopDir,
  itemsHandler,
  deepGenerateSidebar
}